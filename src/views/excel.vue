<template>
<div>
  <input type="file" class="upload" />
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>数据预览</span>
    </div>
    <div class="text item">
      <el-table :data="tableData" border highlight-current-row style="width: 100%;">
        <el-table-column min-width="150" v-for="item in tableHeader" :prop="item.serial" :label="item.value" :key="item.serial">
        </el-table-column>
      </el-table>
    </div>
  </el-card>

  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="idx" v-for="(item, idx) in arr" :key="idx">{{ item }}</el-radio>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="ensure">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  data() {
    return {
      tableData: [],
      tableHeader: '',
      tableTitle: '',
      workbook: '',
      dialogVisible: false,
      radio: '',
      arr: []
    }
  },
  mounted() {
    document.getElementsByClassName('upload')[0].setAttribute('accept', '.xlsx, .xls')
    document.getElementsByClassName('upload')[0].onchange = (e) => {
      const files = e.target.files;
      const itemFile = files[0] // only use files[0]if (!itemFile)
      return this.readerData(itemFile)
    };

    //console.log(XLSX.utils)
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    generateDate({
      tableTitle,
      header,
      results
    }) {
      this.tableTitle = tableTitle;
      this.tableHeader = header;
      this.tableData = results;
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const itemFile = files[0] // only use files[0]
      this.readerData(itemFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    readerData(itemFile) {
      if (itemFile.name.split('.')[1] != 'xls' && itemFile.name.split('.')[1] != 'xlsx') {
        this.$message({
          message: '上传文件格式错误，请上传xls、xlsx文件！',
          type: 'warning'
        });
      } else {
        const reader = new FileReader()
        reader.onload = e => {
          // const data = e.target.result
          // const fixedData = this.fixdata(data)
          // const workbook = XLSX.read(btoa(fixedData), {
          //   type: 'base64'
          // });

          var data = new Uint8Array(e.target.result);
          let workbook = XLSX.read(data, {
            type: 'array'
          });
          console.log(workbook.SheetNames);

          this.arr = workbook.SheetNames;
          this.workbook = workbook;
          if (this.arr.length > 1) {
            this.dialogVisible = true;
          } else {
            this.dealData(0)
          }

        }
        reader.readAsArrayBuffer(itemFile)
      }
    },
    ensure() {
      this.dialogVisible = false;
      this.dealData(this.radio);
    },
    dealData(idx) {
      const firstSheetName = this.workbook.SheetNames[idx] // 第N张表 sheet1
      const worksheet = this.workbook.Sheets[firstSheetName] // 读取sheet1表中的数据
      //console.log(worksheet);

      delete worksheet['!merges'];
      let A_l = worksheet['!ref'].split(':')[1] //当excel存在标题行时
      worksheet['!ref'] = `A2:${A_l}`
      const tableTitle = firstSheetName
      // const header = workbook.Strings.map((v, idx) => {
      //   return {
      //     idx: (idx + 1).toString(),
      //     value: v.r
      //   };
      // });
      const header = [];
      const range = XLSX.utils.decode_range(worksheet['!ref'])

      for (let c = range.s.c; c <= range.e.c; c++) {
        const theader = XLSX.utils.encode_col(c) + '1'
        // console.log(theader); A B C D
        // console.log(worksheet[theader]);
        header.push({
          serial: (c).toString(),
          value: worksheet[theader] ? worksheet[theader]['v'] : worksheet[theader],
          type: 'text'
        })
      }

      //const results = XLSX.utils.sheet_to_json(worksheet);

      var sheet2arr = function (sheet) {
        var result = [];
        var row;
        var rowNum;
        var colNum;
        var range = XLSX.utils.decode_range(sheet['!ref']);
        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          row = [];
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            var nextCell = sheet[
              XLSX.utils.encode_cell({
                r: rowNum,
                c: colNum
              })
            ];
            if (typeof nextCell === 'undefined') {
              row.push(void 0);
            } else row.push(nextCell.w);
          }
          result.push(row);
        }
        return result;
      };

      console.log(sheet2arr(worksheet));

      const results = sheet2arr(worksheet);

      // console.log(results);
      this.generateDate({
        tableTitle,
        header,
        results
      });
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref']);

      console.log(range);
      let C;
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({
          c: C,
          r: R
        })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired defaultif (cell && cell.t)
        hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  width: 100%;
  height: 100px;
}
</style>

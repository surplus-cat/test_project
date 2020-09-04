<template>
<div>
  <input type="file" class="upload" />
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>数据预览</span>
    </div>
    <div class="text item">
      <!--<el-table :data="tableData" border highlight-current-row style="width: 100%;">
        <el-table-column
          type="index"
          width="50"
          v-if="tableData.length > 0">
          <template
            slot="header"
            slot-scope="{ column, $index }">
            序号
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          v-for="item in tableHeader"
          :prop="item.serial"
          :label="item.value"
          :key="item.serial"
          :render-header="renderHeader">
        </el-table-column>
      </el-table>-->

      <lb-table
        class="btable"
        ref="baseTable"
        :data="tableData"
        :column="tableColumns"
        border
        :key="updateKey">
      </lb-table>
    </div>
  </el-card>

  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="idx" v-for="(item, idx) in sheetList" :key="idx" :disabled="item.disabled">{{ item.name }}</el-radio>
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
import LbTable from "@/components/lb-table/lb-table";

export default {
  data() {
    return {
      tableData: [],
      tableHeader: [],
      tableColumns: [],
      tableTitle: '',
      workbook: '',
      dialogVisible: false,
      radio: '',
      sheetList: [],
      customObj: {},
      updateKey: 1,
      valueTypeList: [
        {
          name: '文本',
          type: 'text',
          icon: 'el-icon-remove'
        },
        {
          name: '数值',
          type: 'int',
          icon: 'el-icon-check'
        },
        {
          name: '日期',
          type: 'date',
          icon: 'el-icon-search'
        },
      ],
      transform: {
        'text': 'el-icon-remove',
        'int': 'el-icon-check',
        'date': 'el-icon-search'
      }
    }
  },
  components: {
    LbTable
  },
  mounted() {
    document.getElementsByClassName('upload')[0].setAttribute('accept', '.xlsx, .xls')
    document.getElementsByClassName('upload')[0].onchange = (e) => {
      //console.log(e);
      const files = e.target.files;
      const itemFile = files[0] // only use files[0]if (!itemFile)
      this.tableData = [];
      this.tableColumns = [];
      this.tableHeader = [];
      event.target.value= '';  // 上传后清除文件内容
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
      // this.tableData = results;

      // 过滤空的行和空的列数据
      this.tableData = results.filter(v => v.filter(k => k).length > 0).map(v => v.slice(0, header.length));

      this.tableHeader.map((v, idx) => {
        this.customObj[`show${idx + 1}`] = false;
      });

      let arr = this.tableHeader.map((v, idx) => {
        return {
          prop: v.serial,
          width: 'auto',
          renderHeader: (h, scope) => {
            return  (
              <div class="customerHeader">
                {
                  this.customObj[`show${idx + 1}`]
                  ? <div class="hideBoxer" onClick={(e) => { e.stopPropagation(); }}>
                      <div class="innerContent">
                        <ul>
                          {
                            this.valueTypeList.map((k) => (
                              <li onClick={(e) => { this.toggle(k, idx) }}>
                                <i class={k.icon}></i>
                                <span class="name">{ k.name }</span>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  : ''
                }
                {
                  v.value ?
                  <div class="typeBox">
                    <i class={ `${this.transform[v.type]} icon` } onClick={ (e) => this.showAndHide(e, idx) }></i>
                    <i class="el-icon-arrow-down"></i>
                  </div>
                  : ''
                }
                <span class="customName">{ v.value } </span>
              </div>
            )
          }
        }
      });
      this.tableColumns = arr;
    },
    toggle(k, idx) {
      let item = this.tableHeader[idx];
      item.type = k.type;
      console.log(item);
      this.tableHeader.splice(idx, 1, item);
      this.$set(this.customObj, `show${idx + 1}`, false);
      this.updateKey += 1;
    },
    showAndHide(e, idx) {
      this.$set(this.customObj, `show${idx + 1}`, !this.customObj[`show${idx + 1}`]);
      this.updateKey += 1;
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
        return false;
      }

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

        this.sheetList = workbook.SheetNames.map(v => {
          return {
            name: v,
            disabled: Object.getOwnPropertyNames(workbook.Sheets[v]).length === 1
          }
        });
        this.workbook = workbook;
        if (this.sheetList.length > 1) {
          this.dialogVisible = true;
          this.radio = 0;
        } else {
          this.dealData(0)
        }

      }
      reader.readAsArrayBuffer(itemFile)
    },
    ensure() {
      this.dialogVisible = false;
      this.dealData(this.radio);
    },
    renderHeader(h, {column}) {
      return (
        <div>
          <div class="showArea">
            <i class="el-icon-remove"></i>
            <ul class="hideArea">
              {
                this.valueTypeList.map((v, idx) => {
                  <li onClick={e => this.toggle(e, idx)}>
                    <i class="v.icon"></i>
                    v.name
                  </li>
                })
              }
            </ul>
          </div>
          column
        </div>
      );
    },
    dealData(idx) {
      const firstSheetName = this.workbook.SheetNames[idx] // 第N张表
      const worksheet = this.workbook.Sheets[firstSheetName] // 读取sheetN表中的数据
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
      let header = [];
      const range = XLSX.utils.decode_range(worksheet['!ref']);

      //console.log(range);

      for (let c = range.s.c; c <= range.e.c; c++) {
        const theader = XLSX.utils.encode_col(c) + '1'
        // console.log(theader); A B C D
        // console.log(worksheet[theader]);
        header.push({
          serial: (c).toString(),
          value: worksheet[theader] ? worksheet[theader]['v'] : worksheet[theader],
          type: 'text'
        })
      };

      let originHeader = header.map(v => v.value);

      let dealHeader = header.map(v => v.value).filter(k => k !== undefined);
      //let dealHeader = header.map(v => v.value);
      //console.log(dealHeader, header.map(v => v.value));

      let validEndElem = originHeader.filter(v => v).slice(-1)[0];
      let validEndIdx = originHeader.findIndex(v => v === validEndElem);

      let validHeader = header.map(v => v.value).slice(0, validEndIdx + 1);

      console.log(validHeader);



      if (dealHeader.length !== [...new Set(dealHeader)].length) {
        this.$message({
          message: 'sheet表 列名不可重复!',
          type: 'warning'
        });
        this.sheetList = [];
        return;
      }

      if (validHeader.length !== validHeader.filter(v => v !== undefined).length) {
        this.$message({
          message: 'sheet表 列名不可为空!',
          type: 'warning'
        });
        this.tableData = [];
        this.sheetList = [];
        return;
      }

      header = header.filter(v => validHeader.includes(v.value));


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

      //console.log(sheet2arr(worksheet));

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

/deep/.el-table {
  .el-table__header-wrapper {
    overflow: visible;
  }
  th {
    overflow: visible;
  }

  .cell {
    overflow: visible;
  }

  .customerHeader {
    position: relative;
    overflow: visible;
    padding: 0;
    display: flex;

    div {
      margin: 0;
      padding: 0;
    }

    .hideBoxer {
      width: 104px;
      line-height: 1;
      background-color: #FFFFFF;
      box-shadow: 0px 2px 12px 0px rgba(48, 49, 51, 0.06);
      border: 1px solid #EBEEF5;
      position: absolute;
      top: 45px;
      left: 0;
      z-index: 10;
      overflow: visible;

      &:before {
        content: "";
        position: absolute;
        display: inline-block;
        left: 8px;
        top: -4px;
        width: 0;
        height: 0;
        vertical-align: middle;
        border-bottom: 4px dashed #fff;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
      }

    }

    .icon {

      cursor: pointer;
    }

    .typeBox {
      display: flex;
      width: 35px;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
      border-bottom: 1px solid #3654EA;
    }

    .innerContent {
      width: 100%;

      li {
        padding-left: 15px;
        line-height: 40px;
        cursor: pointer;
      }

      .name {
        margin-left: 10px;
      }
    }
  }
}



</style>

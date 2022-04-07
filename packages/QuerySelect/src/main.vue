<template>
  <div
    v-clickoutside="handleClose"
    class="query-select"
    @click.stop="toggleMenu"
  >
    <template v-if="multiple">
      <div
        class="qs-tags"
        :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
      >
        <div>
          <el-tag
            v-for="item in selectedRows"
            :key="item[valueKey]"
            disable-transitions
            type="info"
            :closable="!disabled"
            size="mini"
            @close="onDeleteTag($event, item)"
          >
            <span>{{ item[valueLabel] }}</span>
          </el-tag>
        </div>
      </div>
    </template>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      :placeholder="placeholderLabel"
      :clearable="clearable"
      readonly
      :disabled="disabled"
      autocomplete="off"
      @focus="handleFocus"
      @blur="handleBlur"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="['el-input__icon', 'el-icon-' + iconClass]"
        ></i>
        <i
          v-if="showClose"
          class="el-input__icon el-icon-circle-close"
          @click="handleClearClick"
        ></i>
      </template>
    </el-input>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <dropdown v-show="visible" ref="popper">
        <!-- 下拉详情 -->
        <div ref="qsContent" class="qs-content" :style="{ width: width }">
          <div v-if="showQuery" class="qs-query">
            <el-form
              ref="searchForm"
              class="query-form"
              size="mini"
              :label-width="labelWidth"
              @submit.native.prevent
              :model="searchForm"
            >
              <template>
                <el-form-item
                  v-for="field in searchFields"
                  :key="field._id + '_fi_' + field.field"
                  :label="field.label"
                  :prop="field.field"
                >
                  <input
                    type="text"
                    class="qs-search-input"
                    :value="searchForm[field.field]"
                    :placeholder="`请输入${field.label}`"
                    @input="onFieldInput($event, field.field)"
                  />
                </el-form-item>
              </template>
            </el-form>
            <div class="query-footer">
              <el-button
                type="text"
                style="color: #272727; font-size: 14px"
                size="mini"
                @click="onReset"
                >重置</el-button
              >
              <el-button
                type="text"
                style="font-size: 15px; margin-top: -1px"
                size="mini"
                @click="onSearch"
                >搜索</el-button
              >
              <slot name="line"></slot>
              <slot name="btn"></slot>
            </div>
          </div>
          <div class="qs-table" :style="{ width: tableWidth + 'px' }">
            <el-table
              ref="dataTable"
              v-loading="loading"
              :data="tableData"
              :highlight-current-row="!multiple"
              max-height="300px"
              :row-class-name="setRowClass"
              @row-click="onSelect"
            >
              <slot></slot>
            </el-table>
            <el-pagination
              :current-page.sync="pageNo"
              :page-size.sync="pageSize"
              :total="total"
              layout="prev, pager, next"
              style="padding: 10px 0 10px"
              background
              small
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </div>
      </dropdown>
    </transition>
  </div>
</template>

<script>
import Dropdown from './SelectDropdown';
import Emitter from 'element-ui/src/mixins/emitter';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import {
  addResizeListener,
  removeResizeListener
} from 'element-ui/src/utils/resize-event';
export default {
  name: 'QuerySelect',
  components: { Dropdown },
  directives: { Clickoutside },
  mixins: [Emitter],
  provide() {
    return {
      qsSelect: this
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    size: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      required: false,
      default: '',
      type: [String, Array, Number]
    },
    valueKey: {
      required: true,
      type: String
    },
    valueLabel: {
      required: true,
      type: [String, Array]
    },
    width: {
      type: [String],
      default: ''
    },
    remote: {
      type: Function,
      required: true,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    searchFields: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '73px'
    },
    defaultLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedLabel: '',
      selectedRow: null,
      selectedRows: [], // 多选
      visible: false,
      placement: 'top',
      tableData: [],
      searchForm: {}, // 查询表单
      pageNo: 1,
      pageSize: 10,
      total: 0,
      showQuery: false,
      inputWidth: 0,
      inputHovering: false,
      loading: false,
      searchFieldsList: [],
      tableWidth: ''
    };
  },
  computed: {
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria =
        this.clearable && this.inputHovering && hasValue && !this.disabled;
      return criteria;
    },
    iconClass() {
      return this.visible ? 'arrow-up' : 'arrow-up is-reverse';
    },
    placeholderLabel() {
      if (this.multiple) {
        return this.selectedRows.length ? '' : this.placeholder;
      } else {
        return this.placeholder;
      }
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.broadcast('SelectDropdown', 'destroyPopper');
      } else {
        this.broadcast('SelectDropdown', 'updatePopper');
      }
      this.$emit('visible-change', val);
    },
    defaultLabel(val) {
      if (val) {
        this.selectedLabel = val;
      } else {
        this.selectedLabel = '';
      }
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    value(val) {
      if (!val) {
        if (!this.multiple) {
          this.selectedLabel = '';
          this.selectedRow = null;
        } else {
          this.selectedRows = [];
        }
      }
    }
  },
  mounted() {
    addResizeListener(this.$el, this.handleResize);
    const reference = this.$refs.reference;
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    if (
      this.searchFields &&
      Array.isArray(this.searchFields) &&
      this.searchFields.length
    ) {
      this.showQuery = true;
    } else {
      this.showQuery = false;
    }
    this.setDefaultLabel();
  },
  beforeDestroy() {
    if (this.$el && this.handleResize)
      removeResizeListener(this.$el, this.handleResize);
  },
  methods: {
    setDefaultLabel() {
      if (this.multiple) {
        this.selectedRows =
          this.values?.map((val, index) => {
            return {
              [this.valueKey]: val,
              [this.valueLabel]: this.defaultLabel[index]
            };
          }) || [];
      } else {
        if (this.defaultLabel) {
          this.selectedLabel = this.defaultLabel;
        }
      }
    },
    handleClearClick(event) {
      event.stopPropagation();
      if (!this.multiple) {
        this.selectedLabel = '';
        this.selectedRow = null;
      } else {
        this.selectedRows = [];
      }
      const value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.visible = false;
      this.$emit('clear');
      this.$emit('change', '', null);
    },
    handleClose() {
      this.visible = false;
    },
    handleFocus(event) {
      this.$emit('focus', event);
      this.getTableData().then(() => {
        this.setCurrentRow();
        this.broadcast('SelectDropdown', 'updatePopper');
      });
    },
    toggleMenu() {
      if (!this.disabled) {
        this.visible = !this.visible;
        if (this.visible) {
          this.$refs.reference.focus();
          this.onReset();
        }
      }
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
    },
    getTableData() {
      this.loading = true;
      return this.remote({
        ...this.searchForm,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          this.$nextTick(() => {
            if (!this.tableWidth) {
              this.tableWidth = this.$refs.qsContent.offsetWidth || '';
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onFieldInput(e, field) {
      const target = e.target || e.srcElement;
      const value = target.value;
      this.searchForm[field] = value;
    },
    // 查询
    onSearch() {
      this.pageNo = 1;
      this.getTableData().then(() => {
        this.setCurrentRow();
        this.broadcast('SelectDropdown', 'updatePopper');
      });
    },
    pageSearch() {
      this.getTableData().then(() => {
        this.setCurrentRow();
        this.broadcast('SelectDropdown', 'updatePopper');
      });
    },
    // 重置
    onReset() {
      const form = this.$refs['searchForm'];
      if (form) {
        form.resetFields();
        this.onSearch();
      }
    },
    // 页码变化
    currentChange(page) {
      this.pageNo = page;
      this.pageSearch();
    },
    // 选中操作
    onSelect(row, column, event) {
      if (this.multiple) {
        this.doMuiltSelect(row);
      } else {
        if (
          this.selectedRow &&
          this.selectedRow[this.valueKey] === row[this.valueKey]
        ) {
          this.visible = false;
          return;
        }
        this.selectedRow = row;
        this.$emit('input', row[this.valueKey]);
        this.setSelected(row);
        this.visible = false;
        this.$nextTick(() => {
          this.$emit('change', row[this.valueKey], row);
        });
      }
    },
    setRowClass({ row, index }) {
      if (
        this.selectedRows.some(val => val[this.valueKey] === row[this.valueKey])
      ) {
        return 'multi-selected-row';
      }
      return '';
    },
    // 多选
    doMuiltSelect(row) {
      const index = this.selectedRows.findIndex(
        val => val[this.valueKey] === row[this.valueKey]
      );
      if (index > -1) {
        // 去选
        this.onDeleteTag(null, row);
      } else {
        this.selectedRows.push({
          ...row
        });
        this.emitMuiltChange();
      }
    },
    setSelected(row) {
      this.$refs.dataTable?.setCurrentRow(row);
      if (Array.isArray(this.valueLabel)) {
        this.selectedLabel = this.valueLabel
          .map(key => {
            return row[key];
          })
          .join(' -- ');
      } else {
        this.selectedLabel = row[this.valueLabel];
      }
    },
    setCurrentRow() {
      if (this.value) {
        const item = this.tableData.find(
          val => val[this.valueKey] === this.value
        );
        if (item) {
          this.setSelected(item);
        }
      }
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    onDeleteTag(e, row) {
      const index = this.selectedRows.findIndex(
        val => val[this.valueKey] === row[this.valueKey]
      );
      this.selectedRows.splice(index >>> 0, 1);
      this.emitMuiltChange();
    },
    // 发送多选绑定值
    emitMuiltChange() {
      this.$emit('input', this.selectedRows.map(val => val[this.valueKey]));
      this.$emit(
        'change',
        this.selectedRows.map(val => val[this.valueKey]),
        this.selectedRows
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.query-select {
  position: relative;
  width: 100%;
  cursor: pointer;
}
.is-reverse {
  transform: rotate(180deg);
}
::v-deep {
  .el-input__inner {
    cursor: pointer;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
  .el-pagination {
    margin-top: 5px;
  }
  .el-table__header {
    font-size: 14px;
  }
  .el-table__row {
    font-size: 14px;
    cursor: pointer;
  }
  .el-table__body tr.current-row > td {
    background: transparent;
    color: #4385ff;
  }
  .el-table__body tr.multi-selected-row > td {
    color: #4385ff;
  }
}
.qs-content {
  display: flex;
  flex-direction: column;
}
.qs-table {
  padding-bottom: 5px;
  width: 100%;
  position: relative;
}
.qs-query {
  padding: 5px;
  display: flex;
  align-items: center;
  .query-form {
    flex-grow: 1;
    ::v-deep {
      .el-input__inner {
        cursor: auto;
      }
      .el-form-item__label {
        font-size: 14px;
        color: #272727;
        margin-top: 1.5px;
      }
    }
    padding-right: 10px;
    border-right: 1px solid #ddd;
  }
  .query-footer {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 5px 10px;
    display: flex;
    justify-content: space-around;
    .el-button {
      margin: 0 5px;
    }
  }
}
.qs-tags {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
  overflow-x: auto;
  &::v-deep {
    .el-tag {
      margin: 2px 0 2px 6px;
    }
    .el-tag.el-tag--info .el-tag__close {
      // background-color: #5a6073;
      color: #5a6073;
    }
    .el-tag.el-tag--info .el-tag__close:hover {
      background-color: #909399;
      color: white;
    }
  }
}
.qs-search-input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 2px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  line-height: 28px;
  outline: none;
  padding: 0 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  margin: 1px 0;
  &:hover {
    border-color: #c0c4cc;
  }
  &:focus {
    outline: none;
    border-color: #409eff;
  }
  &::placeholder {
    color: #c0c4cc;
  }
}
</style>

<style lang="scss">
.el-tooltip__popper {
  z-index: 9999 !important;
}
</style>

```JS
import { Component, OnInit, ViewChild } from '@angular/core';
import { columns, item } from '../columns';
@Component({
  selector: 'app-table-render',
  templateUrl: './table-render.component.html'
})
export class TableRenderComponent implements OnInit {
  @ViewChild('table', { static: true }) table: any;

  filters: any[] = [
    {
      text: '男',
      value: '男'
    },
    {
      text: '女',
      value: '女'
    }
  ];

  columns = [
    {
      showCheckbox: true,
      width: '60px',
      left: '0px'
    },
    { title: '名称', key: 'name' },
    {
      title: '性别',
      key: 'gender',
      showFilter: true,
      filterMultiple: false,
      filters: [...this.filters],
      filterChange: (event: any) => {
        this.handleFilter(event, 'gender');
      }
    },
    {
      title: '年龄',
      key: 'age',
      showSort: true,
      sortOrderChange: (event: any) => {
        const data = { key: 'age', value: event };
        this.handleSortChange(data);
      }
    },
    { title: '身高', key: 'height' },
    { title: '身份', key: 'identity' },
    {
      title: '出生日期',
      key: 'createTime',
      showSort: true,
      sortOrderChange: (event: any) => {
        const data = { key: 'createTime', value: event };
        this.handleSortChange(data);
      }
    },
    { title: '链接', key: 'link', renderKey: 'linkTemp', thRenderKey: 'linkThTemp' }
  ];
  tableData: any[] = [];
  tableOldData: any[] = [];
  tableFilterData: any[] = [];

  sortKey = '';
  sortValue = '';
  filterKey = '';
  filterValue = '';

  constructor() {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    for (let i = 0; i < 34; i++) {
      this.tableData.push({
        id: i + 1,
        ...item,
        name: `${item.name}${i}`,
        age: Number((Math.random() * 100).toFixed(0)),
        height: '7尺7寸',
        identity: '季汉昭烈帝',
        createTime: Number((Math.random() * 1000).toFixed(0)),
        gender: i % 2 === 1 ? '男' : '女'
      });
    }
    this.tableOldData = [...this.tableData];
    this.tableFilterData = [...this.tableData];
  }

  handleView(scope: any = {}): void {
    window.open(scope.data[scope.item.key]);
  }

  /**
   * 选中操作
   * @param event 选中项
   */
  handleCheckChange(event: any): void {
  }

  /**
   * 排序
   * @param event 传参
   */
  handleSortChange(event: any): void {
    const { key, value } = event;
    this.sortKey = key;
    this.sortValue = value;
    this.search();
  }

  /**
   * 过滤
   * @param event 传参
   */
  handleFilter(event: any, key: any): void {
    this.filterKey = key;
    this.filterValue = event;
    this.search();
  }

  /**
   * 查询处理数据
   */
  search() {
    let data = [];
    if (this.filterKey && this.filterValue) {
      data = [...this.tableOldData].filter(item => {
        return item[this.filterKey] === this.filterValue;
      });
    } else {
      data = [...this.tableOldData];
    }
    if (this.sortKey && this.sortValue) {
      this.tableData = data.sort((a, b) => {
        return this.sortValue === 'descend' ? b[this.sortKey] - a[this.sortKey] : a[this.sortKey] - b[this.sortKey];
      });
    } else {
      this.tableData = [...data];
    }
  }
}

```

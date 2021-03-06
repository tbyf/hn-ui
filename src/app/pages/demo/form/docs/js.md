```JS
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  @ViewChild('form') form: any;

  params: any = {
    input: '12',
    year: new Date()
  };

  jsonParams = {};

  items: any[] = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' }
  ];

  treeList = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    },
    {
      title: 'parent 2',
      key: '200',
      children: [
        {
          title: 'parent 2-0',
          key: '2001',
          children: [
            { title: 'leaf 2-0-0', key: '20010', isLeaf: true },
            { title: 'leaf 2-0-1', key: '20011', isLeaf: true }
          ]
        }
      ]
    }
  ];

  formList: any[] = [
    {
      label: '输入框',
      key: 'input',
      type: 'input',
      required: true,
      validators: [Validators.required],
      errorMsg: '请输入'
    },
    {
      label: '数字输入框',
      key: 'inputNumber',
      type: 'input-number',
      required: true,
      validators: [Validators.required],
      errorMsg: '请输入'
    },
    { label: '单选框', key: 'radio', type: 'radio', disabled: true, options: [...this.items] },
    { label: '单选框按钮', key: 'radioBtn', type: 'radio-button', options: [...this.items] },
    { label: '多选框', key: 'checkbox', type: 'checkbox', options: [...this.items] },
    { label: '评分', key: 'rate', type: 'rate' },
    { label: '选择框', key: 'select', type: 'select', options: [...this.items] },
    { label: '树选择框', key: 'treeSelect', type: 'tree-select', options: [...this.treeList] },
    {
      label: '级联选择',
      key: 'cascader',
      type: 'cascader',
      options: [...this.treeList],
      nzValueProperty: 'key',
      nzLabelProperty: 'title'
    },
    { label: '滑动输入条', key: 'slider', type: 'slider' },
    { label: '开关', key: 'switch', type: 'switch' },
    { label: '年', key: 'year', type: 'year' },
    { label: '月', key: 'month', type: 'month' },
    { label: '周', key: 'week', type: 'week' },
    { label: '日', key: 'date', type: 'date' },
    { label: '时刻', key: 'time', type: 'time' },
    { label: '时间范围', key: 'range', type: 'range', col: 6 },
    {
      label: '子项',
      col: 12,
      children: [
        { label: '输入框', key: 'inputChildren', type: 'input', renderKey: 'inputTemp' },
        { label: '数字输入框', key: 'inputNumberChildren', type: 'input-number' }
      ]
    }
  ];

  constructor(private http: HttpService) {}

  ngOnInit() {
    setTimeout(() => {
      this.params = {
        input: '1245',
        inputNumber: 45,
        year: new Date()
      };
      this.jsonParams = JSON.stringify(this.params);
    }, 1000);
  }

  handleClick(): void {
    this.form.submitForm();
  }

  handleReset(): void {
    this.form.resetForm();
  }

  handleSubmit(event: any) {
    this.params = { ...this.params, ...event };
    this.jsonParams = JSON.stringify(this.params);
  }
}

```

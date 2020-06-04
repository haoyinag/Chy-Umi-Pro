// @ts-nocheck
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import User from './index';

let container: any = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('渲染用户数据Mock', async () => {
  const fakeUser = {
    name: 'Joni Baez',
    age: '32',
    address: '123, Charming Avenue',
  };
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    }),
  );

  // 使用异步的 act 应用执行成功的 promise
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector('summary').textContent).toBe(fakeUser.name);
  expect(container.querySelector('strong').textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // 清理 mock 以确保测试完全隔离
  global.fetch.mockRestore();
});

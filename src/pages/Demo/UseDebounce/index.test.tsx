import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import UseDebounce from './index';

let container: any = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement('div');
  // container *必须* 附加到 document，事件才能正常工作。
  document.body.appendChild(container);
});

afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('使用debounce需要对应添加setTimeout测试', () => {
  act(() => {
    render(<UseDebounce />, container);
  });

  // 获取按钮元素，并触发点击事件
  /** 未点击 */
  const button: any = document.querySelector('.fn-debounce');
  /** 此时结果应该是 1 */
  expect(button.textContent).toBe('函数式使用：0');

  /** 点击第一次 */
  setTimeout(() => {
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    /** 此时结果应该是 1 */
    expect(button.textContent).toBe('函数式使用：1');
  }, 350);

  setTimeout(() => {
    /** 连续点击5次， */
    act(() => {
      for (let i = 0; i < 5; i++) {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    /** 此时结果应该是 2 */
    expect(button.textContent).toBe('函数式使用：2');
  }, 350);
});

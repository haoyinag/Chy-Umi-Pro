import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Toggle from './index';

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

it('点击时更新值', () => {
  /** 获取props的事件 */
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });

  // 获取按钮元素，并触发点击事件
  /** 未点击 */
  const button: any = document.querySelector('[data-testid=toggle]');
  /** 此时结果应该是 Turn on */
  expect(button.innerHTML).toBe('Turn on');

  /** 点击第一次 */
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  /** 点击第一次后的结果 */
  expect(onChange).toHaveBeenCalledTimes(1);
  /** 此时结果应该是 Turn off */
  expect(button.innerHTML).toBe('Turn off');

  /** 连续点击5次， */
  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });

  /** 总共点击6次后的结果 */
  expect(onChange).toHaveBeenCalledTimes(6);
  /** 此时结果应该是 Turn on */
  expect(button.innerHTML).toBe('Turn on');
});

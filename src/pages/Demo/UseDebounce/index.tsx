import React, { useState, PureComponent } from 'react';
import { debounce } from 'lodash';

import { Button } from 'antd';

class UseDebounceClass extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
    /** 也可以这样使用 */
    // this.onClick = debounce(this.onClick, 350);
  }

  onClick = () => {
    const num = this.state.count + 1;
    this.setState({
      count: num,
    });
  };

  render() {
    const { count } = this.state;
    return (
      <Button type="primary" onClick={debounce(() => this.onClick(), 350)}>
        Class组件式使用：{count}
      </Button>
    );
  }
}

export default () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    const num = count + 1;
    setCount(num);
  };
  return (
    <div>
      <Button type="primary" onClick={debounce(() => onClick(), 350)}>
        函数式使用：{count}
      </Button>
      {'-----------------'}
      <UseDebounceClass />
    </div>
  );
};

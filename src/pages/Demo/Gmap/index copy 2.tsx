import React, { useRef, useEffect, useState } from 'react';

// import { Button } from "antd";

/** 多边形--多个点 */
const path1 = [
  [116.475334, 39.997534],
  [116.476627, 39.998315],
  [116.478603, 39.99879],
  [116.478529, 40.000296],
  [116.475082, 40.000151],
  [116.473421, 39.998717],
];
/** 三角形--三个点 */
const path2 = [
  [116.474595, 40.001321],
  [116.473526, 39.999865],
  [116.476284, 40.000917],
];
/** 三角形--三个点 */
const path3 = [
  [116.476627, 39.998315],
  [116.474595, 40.001321],
  [116.478529, 40.000296],
];
const paths = [path1, path2, path3];

export default (): JSX.Element => {
  const container = useRef<any>();
  const [map, setMap] = useState<any>(null);
  const [polyEditor, setPolyEditor] = useState<any>(null);
  const [mapList, setMapList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<any>(null);
  // const [menuContext, setMenuContext] = useState<any>(null);

  useEffect(() => {
    if (container && container.current) {
      /** 地图实例化 */
      const map2 = new AMap.Map(container.current, {
        center: [116.471354, 39.994257],
        zoom: 16.8,
      });
      map2 && setMap(map2);

      /** 多边形填充 */
      const arr: any[] = [];
      paths.map((path: number[][]) => {
        return arr.push(
          /** 这里需要判断不同的类型，暂时写死多边形 */
          new AMap.Polygon({
            path,
          }),
        );
      });
      setMapList(arr);
    }
  }, []);

  useEffect(() => {
    if (map) {
      /** 填充展现--add然后fit */
      map.add(mapList);
      map.setFitView();

      const context = new AMap.ContextMenu({
        isCustom: true,
        /** 自定义弹窗内容 */
        content: `<div className="rightContent" onClick={createPolygon}>右键菜单</div>`,
      });
      /** 多边形弹窗 */
      mapList.map((item: any, index: number) => {
        item.on('rightclick', (e: any) => {
          context.open(map, e.lnglat);
          setEditIndex(index);
        });
      });
      // setMenuContext(context);
    }
  }, [map]);

  useEffect(() => {
    if (editIndex || editIndex === 0) {
      console.log(editIndex);
      setPolyEditor(null);

      /** 多边形弹窗必须在插件AMap.PolygonEditor中注册 */
      map.plugin(['AMap.PolygonEditor'], () => {
        polyEditor && polyEditor.close();
        // menuContext.addItem(
        //   "编辑多边形",
        //   () => {
        //     /** new AMap.PolygonEditor的第二个参数是需要编辑的多边形示例 */
        //     const poly_Editor = new AMap.PolygonEditor(map, mapList[editIndex]);
        //     poly_Editor.addAdsorbPolygons(mapList);
        //     poly_Editor && setPolyEditor(poly_Editor);
        //     poly_Editor.close();
        //     poly_Editor.open();
        //   },
        //   0
        // );
      });
    }
  }, [editIndex]);

  /** 新建多边形 */
  // const createPolygon = () => {
  //   polyEditor.close();
  //   polyEditor.setTarget();
  //   polyEditor.open();
  // };

  /** 编辑多边形 */
  //   const editPolygon = () => {
  //     polyEditor.close();
  //     polyEditor.open();
  //   };

  /** 结束编辑多边形 */
  //   const endPolygon = () => {
  //     polyEditor.close();
  //   };

  return (
    <div className="box">
      <div
        id="container"
        ref={container}
        style={{ width: '100%', height: '600px' }}
      ></div>
      {/* <div className="input-card" style={{ width: "120px" }}>
        <Space>
          <Button className="btn" onClick={() => createPolygon()}>
            新建多边形
          </Button>
          <Button className="btn" onClick={() => editPolygon()}>
            开始编辑
          </Button>
          <Button className="btn" onClick={() => endPolygon()}>
            结束编辑
          </Button>
        </Space>
      </div> */}
    </div>
  );
};

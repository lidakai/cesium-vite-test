import './App.css'
import { Viewer, CameraFlyTo, BillboardCollection, Billboard, ImageryLayer } from "resium";
import { Cartesian3, Transforms, Color, WebMapTileServiceImageryProvider, Math } from 'cesium';
import plane from './assets/plane.svg';
import { useEffect } from 'react';
const longitude = 118.0894; // 经度 (单位：度)
const latitude = 24.4798; // 纬度 (单位：度)
const height = 100 * 10000; // 高度 (单位：米)
const tiandituTk = '0757655cd67b2f6b9632c80ea456d834';
const defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ODk5NWFkMC02NWU4LTRjOTQtYTEyZi1kODM5MDFjOTM5ZDMiLCJpZCI6MTYzNDg2LCJpYXQiOjE2OTMzNzc3NTh9.nCh21J4d862c99c9IiB1-YZhovLPODRGMfYFnX_-Sts'


function App() {
  useEffect(() => {
    const element = document.querySelector('.cesium-viewer-bottom') as HTMLElement;
    if (element) {
      element.style.display = 'none';
    }
  }, [])

  // 将经纬度转换为Cesium的笛卡尔坐标
  const cartesian = Cartesian3.fromDegrees(longitude, latitude, height);

  const viewerOptions = {
    defaultAccessToken,
    animation: false,       //是否显示动画控件
    homeButton: false,       //是否显示home键
    geocoder: false,         //是否显示地名查找控件，如果设置为true，则无法查询
    baseLayerPicker: false, //是否显示图层选择控件
    timeline: false,        //是否显示时间线控件
    fullscreenButton: true, //是否全屏显示
    infoBox: false,         //是否显示点击要素之后显示的信息
    sceneModePicker: false,  //是否显示投影方式控件  三维/二维
    navigationInstructionsInitiallyVisible: false, //导航指令
    navigationHelpButton: false,     //是否显示帮助信息控件
    selectionIndicator: false, //是否显示指示器组件
  };


  const jd = new WebMapTileServiceImageryProvider({
    url:
      "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" + tiandituTk,
    layer: "tiandituImgMarker",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "tiandituImgMarker",
    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],//天地图8个服务器
    minimumLevel: 0,//最小层级
    maximumLevel: 18,//最大层级
  })

  return <Viewer full
    {...viewerOptions}
  >
    <ImageryLayer imageryProvider={jd} />
    <CameraFlyTo duration={5} onComplete={() => {
      console.log('切换镜头结束')
    }}
      // 倾斜
      // orientation={
      //   {
      //     heading: Math.toRadians(0.0),
      //     pitch: Math.toRadians(-15.0),
      //   }
      // }
      destination={
        cartesian
        // Cartesian3.fromDegrees(-122.4175, 37.655, 400)
      } />
    <BillboardCollection modelMatrix={Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(longitude, latitude))}>
      <Billboard color={Color.YELLOW} image={plane} />
    </BillboardCollection>
  </Viewer>;
}

export default App

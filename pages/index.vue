<template>

  <!-- スプラッシュ画面 -->
  <SplashScreen/>

  <!-- ホーム画面 -->
  <div class="home background-fixed">
    <v-container class="home-inner fade-in">

      <!-- ステータス -->
      <v-row class="status mx-2 mt-3">
        <v-col class="px-0">
          <p class="status-text pl-8 pr-3">
            <span>対象物との距離:</span>
            <span class="px-2">{{ Math.round(distance) }}</span>
            <span>m</span>
          </p>
        </v-col>
      </v-row>

      <!-- 背景 -->
      <v-row class="background">
        <v-sheet class="background-inner"></v-sheet>
      </v-row>

      <!-- レーダー -->
      <v-row class="outer-circle">
        <div class="green-scanner"></div>
      </v-row>

    </v-container>
  </div>

  <!-- ダイアログ -->
  <AppDialog ref="appDialogRef" />

</template>

<script setup lang="ts">

  /* 型定義 */
  interface GeolocationCoordinates {
    latitude: number;
    longitude: number;
  }

  /* グローバル変数 */
  const appDialogRef = ref(); // ダイアログ
  
  let watchID: number;
  let audio: HTMLAudioElement = new Audio('./audio/singing_mejiro.mp3');
  const updatedCount = ref(0);
  const isWatching = ref(false);
  const distance = ref(0);
  const targetNumber = ref(0); // 目的地の番号
  const locationData: GeolocationCoordinates[] = []; // 位置情報を格納する配列
  const timeData = { start: 0, end: 0 }; // 開始時刻と終了時刻を格納するオブジェクト

  // 目的地の緯度経度
  const targetData = [
    { latitude: 36.5752, longitude: 140.646806 }, // { latitude: 36.572641705515785, longitude: 140.64342178806652 },
    // { latitude: 36.57309491631298, longitude: 140.64196471837982 },
    // { latitude: 36.57314230594724, longitude: 140.64133439924612 },
    // { latitude: 36.57238982884028, longitude: 140.64263244369673 },
  ];

  // 初期化
  const init = (): void => {
    if (navigator.geolocation) {

      timeData.start = Date.now(); // 開始時間を記録

      watchID = navigator.geolocation.watchPosition(
        position => {  
          const location = position.coords;
          distance.value = getDistance(location, targetData[targetNumber.value]);
          updatedCount.value++;
          isWatching.value = true;

          // 初回のみ現在地を目的地の配列に追加
          if (!updatedCount.value) targetData.push({
            latitude: location.latitude,
            longitude: location.longitude
          });

          locationData.push(location);
          console.log(location);
          console.log(distance);

          // 距離に応じて処理を分岐
          if (distance.value <= 20) {

            // 2つの音源を再生順番に再生
            audio.pause(); // 再生を停止
            audio = new Audio('./audio/get_mejiro.mp3');
            audio.loop = false; // ループ再生しない
            audio.play();
            audio.addEventListener('ended', () => {
              audio = new Audio('./audio/explanation_mejiro.mp3');
              audio.play();
            });

            targetNumber.value++; // 目的地の番号を更新

            // 目的地の番号が目的地の数を超えたら、目的地の番号を0に戻す
            if (targetNumber.value >= targetData.length - 1) {
              finish(); // 終了処理
            }
            
          } else if (distance.value <= 100) {

            // singing.mp3を再生
            if (audio.paused) {
              audio = new Audio('./audio/singing_mejiro.mp3');
              audio.loop = true; // ループ再生
              audio.play();
            }

            audio.volume = 1 - distance.value / 100; // distance.valueが小さくなると、音が大きくなる
            
          } else {

            audio.pause(); // 再生を停止

          }
        },
        err => {
          isWatching.value = false;
          console.log(err);
        },
        { enableHighAccuracy: true }
      );
    }
  }

  // ２点間の距離を取得する
  const getDistance = (location1: GeolocationCoordinates, location2: GeolocationCoordinates): number => {
    const R = 6371; // km
    const diffLatitudeRadian = getRadian(location2.latitude - location1.latitude);
    const diffLongitudeRadian = getRadian(location2.longitude - location1.longitude);
    const latitudeRadian = getRadian(location1.latitude);
    const longitudeRadian = getRadian(location2.latitude);

    const a = Math.sin(diffLatitudeRadian / 2) * Math.sin(diffLatitudeRadian / 2) +
              Math.sin(diffLongitudeRadian / 2) * Math.sin(diffLongitudeRadian / 2) *
              Math.cos(latitudeRadian) * Math.cos(longitudeRadian);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000; // m
  }

  // 度数法から弧度法に変換する
  const getRadian = (value: number): number => {
    return value * Math.PI / 180;
  }

  // 総距離を計算する
  const calculateTotalDistance = (locationData: GeolocationCoordinates[]): number => {
    let totalDistance: number = 0;

    for (let i = 0; i < locationData.length - 1; i++) {
      totalDistance += getDistance(locationData[i], locationData[i + 1]);
    }

    return totalDistance;
  }

  // 終了処理
  const finish = (): void => {
    navigator.geolocation.clearWatch(watchID); // ウォッチを停止
    timeData.end = Date.now(); // 終了時間を記録

    const totalDistance = calculateTotalDistance(locationData); // 総距離を計算
    const time = Math.round((timeData.end - timeData.start) / 1000); // 経過時間を計算

    appDialogRef.value.menuList[0].value = Math.round(totalDistance); // メニューリストの歩いた距離を更新
    appDialogRef.value.menuList[1].value = time; // メニューリストの時間を更新
    appDialogRef.value.openDialog(); // ダイアログを開く

    // 終了音を再生
    audio = new Audio('./audio/result.mp3');
    audio.play();

    // Google Maps Platform Roads APIによる道路の取得
    // const roadData = getRoadData(locationData);
    // console.log(roadData);
  }

  // Google Maps Platform Roads APIによる道路の取得
  // const getRoadData = async (locationData: GeolocationCoordinates[]) => {
  //   const apiKey = '';
  //   const path = locationData.map((location: GeolocationCoordinates) => `${location.latitude},${location.longitude}`).join('|'); // locationDataをpathに変換
  //   const url = `https://roads.googleapis.com/v1/snapToRoads?interpolate=true&path=${encodeURIComponent(path)}&key=${apiKey}`;
  //   const response = await fetch(url);

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }

  onMounted(init); // マウント時に実行
  
</script>

<style lang="scss" scoped>

  /* ホーム画面 */
  .home {
    text-align: center;

    // ステータス
    .status {
      inset: 0 0 auto auto; // top right bottom left
      position: absolute;
      color: $text-color-light;

      .status-text {
        border-radius: $border-radius;
        backdrop-filter: blur($blur-size);
        background: $home-status-background-color;
      }
    }

    // 背景
    .background {
      inset: 0;
      margin: 0;
      position: absolute;
      z-index: -1;

      .background-inner {
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 200px 10px $home-background-color inset;
        background: transparent;
      }
    }
  }

  /* レーダー */
  .outer-circle {
	  top: 50%;
	  left: 53%;
	  transform: translate(-50%, -50%);
  	width: 300px;
  	height: 300px;
  	border-radius: 50%;
  	box-shadow: 0 0 8px 0 #aaa;
    position: absolute;
  }
  
  .green-scanner {
  	/* 	design the green scanner 40px smaller than the outer-circle */
  	width: 260px;
  	height: 260px;
  	border-radius: 50%;
  
  	/* 	center this green-scanner inside the parent */
  	position: absolute;
  	top: 20px;
  	left: 20px;
  
  	/* 	set the background resembling a scanner */
  	background: conic-gradient(#00ff0055, #00ff00);
  
  	/* 	define animation properties and set its easing to linear (default 'ease' doesn't look natural) */
  	animation: scan 4s infinite linear;
  }
  
  /* make waves using the pseudo-elements for semantic purposes */
  .outer-circle:before, .outer-circle:after {
  	content: "";
  	width: 300px;
  	height: 300px;
  	border-radius: 50%;
  	position: absolute;
  	border: 1px solid #eee;
  	animation: ripple 2s infinite linear;
  }
  
  .outer-circle:after {
  	animation-delay: 2s;
  }
  
  @keyframes scan {
  	to {
  		transform: rotate(1turn);
  	}
  }
  
  @keyframes ripple {
  	to {
  		transform: scale(3.0);
  	}
  }
</style>

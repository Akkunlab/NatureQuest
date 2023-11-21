<template>

  <!-- スプラッシュ画面 -->
  <SplashScreen/>

  <!-- ホーム画面 -->
  <div class="home background-fixed">
    <v-container class="home-inner fade-in">

      <!-- タイトル -->
      <v-row class="title">
        <v-col>
          <p class="title-text py-3 mx-2">ホーム</p>
        </v-col>
      </v-row>

      <!-- ステータス -->
      <v-row class="status mx-2 mt-3">
        <v-col class="px-0">
          <p class="status-text pl-8 pr-3">
            <span class="pr-2">ポイント:</span>
            <span>{{ 100 }}</span>
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

</template>

<script setup lang="ts">

  /* グローバル変数 */
  let watchID: number;
  let updatedCount = ref(0);
  let isWatching = ref(false);
  let content = ref('');
  let targetLocation = { latitude: 35.681236, longitude: 139.767125 }; // ここに目的地の緯度経度を設定

  // 初期化
  const init = () => {
    if (navigator.geolocation) {
      watchID = navigator.geolocation.watchPosition(
        position => {
          updatedCount.value++;
          isWatching.value = true;
          const location = position.coords;
          const distance = getDistance(location, targetLocation);
          console.log(location);

          if(distance <= 0.1) {
            content.value = 'もうすぐ目的地です！（100M以内）';
          } else {
            content.value = 'まだ目的地は先です。';
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
  const getDistance = (location1: GeolocationCoordinates, location2: typeof targetLocation) => {
    const R = 6371; // km
    const diffLatitudeRadian = getRadian(location2.latitude - location1.latitude);
    const diffLongitudeRadian = getRadian(location2.longitude - location1.longitude);
    const latitudeRadian = getRadian(location1.latitude);
    const longitudeRadian = getRadian(location2.latitude);

    const a = Math.sin(diffLatitudeRadian / 2) * Math.sin(diffLatitudeRadian / 2) +
              Math.sin(diffLongitudeRadian / 2) * Math.sin(diffLongitudeRadian / 2) *
              Math.cos(latitudeRadian) * Math.cos(longitudeRadian);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // 度数法から弧度法に変換する
  const getRadian = (value: number) => {
    return value * Math.PI / 180;
  }

  onMounted(init); // マウント時に実行
</script>

<style lang="scss" scoped>

  /* ホーム画面 */
  .home {
    text-align: center;

    // タイトル
    .title {
      inset: 0 auto auto 0; // top right bottom left
      position: absolute;
      color: $text-color-light;

      .title-text {
        width: 82px;
      
        &::after {
          content: '';
          display: block;
          height: 1px;
          border-radius: 1px;
          background: $text-color-light;
        }
      }
    }

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

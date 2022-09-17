<template>
  <svg class="loader" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
<circle fill="none" stroke="#aba9a9" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
  <circle fill="#aba9a9" stroke="#9f9b9b" stroke-width="3" cx="8" cy="54" r="6" >
    <animateTransform
      attributeName="transform"
      dur="2s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite" />
  </circle>
</svg>

</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss">
svg{
  width: 100px;
  height: 100px;
  margin: 20px;
  display:inline-block;
}
h1{
  text-align: center;
  color: gray;
  margin: 0 0 100px;
  font-size: 34px;
  font-weight: 100;
  text-transform: uppercase;
  background-color: gray;
  padding: 20px 0;
  b{
    font-weight: 700;
  }
}

</style>

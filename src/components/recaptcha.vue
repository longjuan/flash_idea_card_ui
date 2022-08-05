<template>
  <!-- 添加一个 div 用作容器 -->
  <div id="grecaptcha">验证模块加载中，长时间未加载请刷新重试</div>
</template>
<script>
export default {
  name: "Recaptcha",
  props: {
    callback: Function
  },
  data() {
    return {
      // reCaptcha设置
      sitekey: "6Ldhr6AgAAAAANpMa9MICJGAMtDpOvXiZvDtHgbH"
    };
  },
  methods: {
    submit: function(token) {
      this.callback(token);
    },
    loaded() {
      setTimeout(() => {
        window.grecaptcha.render("grecaptcha", {
          sitekey: this.sitekey,
          callback: this.submit
        });
      }, 150);
    }
  },
  mounted() {
    this.loaded();
  }
};
</script>
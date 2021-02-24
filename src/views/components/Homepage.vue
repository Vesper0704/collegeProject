<!--主页上的排版-->
<template>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-4 shape-dark" style="background-color: indianred">

            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
          <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
          <span class="span-100"></span>
          <span class="span-100"></span>
            <span class="span-75"></span>
          <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
          <span class="span-50"> </span>
            <span class="span-50"></span>
            <span class="span-100"></span>
          <span class="span-100"></span>
          <span class="span-100"></span>
          <span class="span-100"></span>
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-7 text-center pt-lg">

                      <p class="lead text-white-50 mt-4 mb-5 fontstyle" style="font-size:30px">Copyright Protection Platform based-on BLOCKCHAIN</p>
                        <img src="img/brand/blockchain1.png" style="width:2000px" class="img-fluid">

                      <p class="lead text-white-50 mt-4 mb-5 " style="font-size:18px;color: navajowhite;font-family: 'Comic Sans MS'">
                        Thanks for choosing our platform :) </p>
                      <p class="lead text-white-50 mt-4 mb-5 " style="color: #25ddf5"> - </p>

                        <!-- <div class="btn-wrapper">
                            <base-button tag="a"
                                         href="https://demos.creative-tim.com/vue-argon-design-system/documentation"
                                         class="mb-3 mb-sm-0"
                                         type="info"
                                         icon="fa fa-code">
                                Components
                            </base-button>
                            <base-button tag="a"
                                         href="https://www.creative-tim.com/product/vue-argon-design-system"
                                         class="mb-3 mb-sm-0"
                                         type="white"
                                         icon="ni ni-cloud-download-95">
                                Download Vue
                            </base-button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>
<script>
export default {};
</script>
<style>
.fontstyle{font:italic 1em Georgia, serif;}

/*用1.5s时间过渡*/
.drj-enter-active{
  animation: aaa 1.5s;
}
.drj-leave-active{
  animation: aaa 1.5s reverse;
}
@keyframes aaa {
  0%{
    opacity: 0;
    transform :translateX(100px);
  }

  100%{
    opacity: 1;
    transform :translateX(0px);

  }
}
</style>

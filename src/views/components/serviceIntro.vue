<template>
    <div class="container" style="background-color: #2e2e57">
            <div class="row justify-content-center">
<!--                <h2 class="section-title" style="color:#2bffc6" >版权服务体系</h2>-->
              <h2 class="section-title" style="color:#2bffc6" > About The Project</h2>
                <div class="col-lg-11">
                    <div class="row row-grid">
                        <div class="col-lg-4">
                            <card class="border-0" hover shadow body-classes="py-5">
                                <icon name="ni ni-folder-17" type="primary" rounded class="mb-4">
                                </icon>
                                <h6 class="text-primary text-uppercase">BigchainDB</h6>
                                <p class="description mt-3">
                                  With high throughput, low latency, powerful query functionality,
                                  decentralized control, immutable data storage and built-in asset support.</p>
                              <p class="description mt-3"> BigchainDB is like a database with blockchain characteristics.Deploy blockchain proof-of-concepts,
                                  platforms and applications with it.
                              </p>


                                <base-button tag="a" href="https://www.bigchaindb.com/" target="_blank" type="primary" class="mt-4">
                                    Learn More
                                </base-button>
                            </card>
                        </div>
<!--                        <div class="col-lg-4">-->
<!--                            <card class="border-0" hover shadow body-classes="py-5">-->
<!--                                <icon name="ni ni-istanbul" type="success" rounded class="mb-4">-->
<!--                                </icon>-->
<!--                                <h6 class="text-success text-uppercase">Tendermint共识机制</h6>-->
<!--                                <p class="description mt-3">使用Tendermint作为底层的共识机制，Tendermint能够容忍至多1/3的节点失效，能够安全复制任何区块链向量机状态，能够确保TPS达到千级以上，并且使用了安全的点对点传输协议，能够保证区块链系统的保证安全性、可信性、扩展性、高效性。</p>-->
<!--                                <base-button tag="a" href="https://tendermint.com/" type="success" class="mt-4">-->
<!--                                    了解更多-->
<!--                                </base-button>-->
<!--                            </card>-->
<!--                        </div>-->
                      <div class="col-lg-4">
                        <card class="border-0" hover shadow body-classes="py-5">
                          <icon name="ni ni-atom" type="success" rounded class="mb-4">
                          </icon>
                          <h6 class="text-success text-uppercase">IPFS</h6>
                          <p class="description mt-3">The InterPlanetary File System (IPFS) is a protocol and peer-to-peer network
                            for storing and sharing data in a distributed file system. </p>
                          <p class="description mt-3">IPFS uses content-addressing to uniquely
                            identify each file in a global namespace connecting all computing devices.</p>
                          <base-button tag="a" href="https://en.wikipedia.org/wiki/InterPlanetary_File_System" target="_blank" type="success" class="mt-4">
                           Learn More
                          </base-button>
                        </card>
                      </div>
                      <div class="col-lg-4">
                        <card class="border-0" hover shadow body-classes="py-5">
                          <icon name="ni ni-air-baloon" type="default" rounded class="mb-4">
                          </icon>
                          <h6 class="text-success text-uppercase">Vue.js</h6>
                          <p class="description mt-3">
                            Vue.js is an open-source model–view–viewmodel (MVVM)
                            front end JavaScript framework for building user interfaces and single-page applications.</p>
                          <p class="description mt-3"> It features an incrementally adaptable architecture that
                            focuses on declarative rendering.
                          </p>
                          <base-button tag="a" href="https://en.wikipedia.org/wiki/Vue.js" target="_blank" type="default" class="mt-4">
                            learn more
                          </base-button>
                        </card>
                      </div>
                      <div class="col-lg-4">
                        <card class="border-0" hover shadow body-classes="py-5">
                          <icon name="ni ni-books" type="info" rounded class="mb-4">
                          </icon>
                          <h6 class="text-success text-uppercase">Blockchain</h6>
                          <p class="description mt-3">A blockchain is a growing list of records, called blocks,
                            that are linked using cryptography. Each block contains a cryptographic hash of the previous block,
                            a timestamp, and transaction data (generally represented as a Merkle tree). It is the basic idea of the project, combined with
                          the copyright platform.</p>
                          <base-button tag="a" href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" type="info" class="mt-4">
                            Learn more
                          </base-button>
                        </card>
                      </div>
                        <div class="col-lg-4">
                            <card class="border-0" hover shadow body-classes="py-5">
                                <icon name="ni ni-planet" type="warning" rounded class="mb-4">
                                </icon>
                                <h6 class="text-warning text-uppercase">Nosql Database</h6>
                                <p class="description mt-3">Instead of using the traditional <b>block</b> data structure in
                                the blockchain system, the nosql database (MongoDB) is applied to act as the storage/manipulation
                                of transactions in the project to ensure high throughput and operation efficiency. MongoDB supports
                                indexing, ad-hoc queries etc.</p>
                                <base-button tag="a" href="https://www.mongodb.com/" target="_blank" type="warning" class="mt-4">
                                   Learn more
                                </base-button>
                            </card>
                        </div>
                      <div class="col-lg-4">
                          <card class="border-0" hover shadow body-classes="py-5">
                              <icon name="ni ni-istanbul" type="danger" rounded class="mb-4">
                              </icon>
                              <h6 class="text-success text-uppercase">Expressjs</h6>
                              <p class="description mt-3">
                                Express is a minimal and flexible Node.js web application framework that
                                provides a robust set of features for web and mobile applications.
                                Express provides a thin layer of fundamental web application features,
                                without obscuring Node.js features. Back-end framework of the project.
                              </p>
                              <base-button tag="a" href="https://expressjs.com/" target="_blank" type="danger" class="mt-4">
                                  learn more
                              </base-button>
                          </card>
                      </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'serviceIntroduction'
}
</script>

<style lang="scss" scoped>
.section-title {
    margin-bottom: 8vh;
}
</style>

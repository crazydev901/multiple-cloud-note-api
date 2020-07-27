const modules = [
  /uuid/,
]

if(process.env.SLS_CLOUD === "azure") {
  modules.push(/mongodb/)
  modules.push(/mongodb-client-encryption/)
}

module.exports = modules
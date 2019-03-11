
export function edgeData(source, target) {
  return {
    data: {
      group: 'edges',
      source,
      target,
      colorCode: 'black',
      strength: 10
    }
  }
}

export function nodeData(id, name) {

}

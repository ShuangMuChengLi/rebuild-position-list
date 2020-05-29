
import changeLonLat from '../../dist/index.umd'
import _ from 'lodash'
const list1 = [
  {
    lon: '1', lat: '2'
  },
  {
    lon: '1.366346463', lat: '2.34234234223'
  },
  {
    lon: '1.366346463w', lat: '2.34234234223'
  }
]
const list2 = [
  {
    lonLat: ['1', '8']
  },
  {
    lonLat: ['1.3663464635', '2.34234234223']
  },
  {
    lonLat: ['1.3663464635e', '2.34234234223']
  }
]
const list3 = [
  {
    longitude: 1, latitude: 2
  }
]
const list4 = [
  {
    lonLat: [1, 1]
  }
]
const list5 = [

]
const list6 = [
  {
    longitude: '1', latitude: '2'
  },
  {
    longitude: '1', latitude: '2'
  },
  {
    longitude: '1w', latitude: '2'
  }
]
const list7 = [
  {
    lon: 1, lat: 2
  }
]
// console.log(changeLonLat(list1));

expect.extend({
  toBeDivisibleBy (ary, keyName, ary2) {
    function checkIsHasLonLat () {
      if (ary.length === ary2.length === 0) return true

      if (ary.length === 0) {
        return false // 获得的数组长度为0
      }

      for (const item of ary) {
        if (!Object.prototype.hasOwnProperty.call(item, keyName)) return false // ary 中不存在 名为keyName的值时返回false
      }

      return true
    }
    const pass = checkIsHasLonLat()

    if (pass) {
      return {
        message: () => (
          `changeLonLat的方法检验数组 ${ary} 返回值存在 ${keyName}`
        ),
        pass: true
      }
    } else {
      return {
        message: () => (`changeLonLat的方法检验数组 ${ary} 返回值不存在 ${keyName}`),
        pass: false
      }
    }
  },

  toCheckListLength (ary, oldAry) {
    function checkListLength () {
      return ary.length === oldAry.length
    }

    const pass = checkListLength()
    if (pass) {
      return {
        message: () => (
          `changeLonLat的方法检验数组 ${oldAry} 中没有坏值，全部正确解析`
        ),
        pass: true
      }
    } else {
      return {
        message: () => (`changeLonLat的方法检验数组，返回值少了 ${oldAry.length - ary.length} 条数据`),
        pass: false
      }
    }
  },

  toCheckNewListIsNumber (ary, keyName) {
    /**
     * @return {boolean}
     */
    function CheckNewListIsNumber (ary, keyName) {
      if (ary.length === 0) return false // 获得的数组长度为0

      for (const item of ary) {
        if (typeof _.get(item, `[${keyName}][0]`) !== 'number' &&
          typeof _.get(item, `[${keyName}][1]`) !== 'number') return false
      }

      return true
    }
    const pass = CheckNewListIsNumber(ary, keyName)

    if (pass) {
      return {
        message: () => (
          'changeLonLat的方法检验数组lonLat字段是由数字组成的'
        ),
        pass: true
      }
    } else {
      return {
        message: () => ('changeLonLat的方法检验数组lonLat字段存在在至少一个不是由数字组成的'),
        pass: false
      }
    }
  },

  toResultIsNull (ary, oldAry) {
    function toCheckResultIsNull (ary, oldAry) {
      return ary.length === oldAry.length && ary.length === 0
    }
    const pass = toCheckResultIsNull(ary, oldAry)

    if (pass) {
      return {
        message: () => (
          '传入的changeLonLat的方法数组为空'
        ),
        pass: true
      }
    } else {
      return {
        message: () => ('传入的changeLonLat的方法数组为空或者传出的数组不为空'),
        pass: false
      }
    }
  }
})

const list = [list1, list2, list3, list4, list6, list7]

for (const item of list) {
  test('changeLonLat方法返回的数据有LonLat这个属性值', () => {
    expect(changeLonLat(item)).toBeDivisibleBy('lonLat', item)
  })

  test('changeLonLat方法返回的数据与旧数组的长度一致', () => {
    expect(changeLonLat(item)).toCheckListLength(item)
  })

  test('changeLonLat方法返回的数据的lonLat字段是否都是数字类型组成的数组', () => {
    expect(changeLonLat(item)).toCheckNewListIsNumber('lonLat')
  })
}

test('传入的参数空数组是否为空', () => {
  expect(changeLonLat(list5)).toResultIsNull(list5)
})

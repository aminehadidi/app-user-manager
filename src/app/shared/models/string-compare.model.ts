


class Range {
  constructor(public cursor: number, public len: number) {
  }
}

export class FullRange {
  isEmpty: boolean = false
  maxlen: number
  constructor(public r1: Range,
    public r2: Range) {
    this.isEmpty = r1.len === 0 || r2.len === 0
    this.maxlen = r1.len > r2.len ? r2.len : r1.len
  }



}
const RANGE_ZERO = new FullRange(new Range(-1, 0), new Range(-1, 0))

// Doit etre > 0
const MIN_SIZE_MATCH = 2

function stringToArray(s: string): string[] {
  const a = [];
  for (const s2 of s) {
    a.push(s2);
  }
  return a
}

export class StringCompareModel {


  arr2: string[]
  arr1: string[]

  matchingRanges: FullRange[]
  constructor(c: string, f: string) {
    this.arr1 = stringToArray(c);
    this.arr2 = stringToArray(f);

    this.matchingRanges = this.recoverAllMatchingSubstrings()
   }

  isAMatch(ranges: Range[], index: number): boolean {
    for (let i = 0; i < ranges.length; i++) {
      let r = ranges[i]

      if (index >= r.cursor && index < (r.cursor + r.len)) {
        return true
      }
    }

    return false
  }
  formatString(arr: string[], ranges: Range[]): string {
    let ret: string[] = []

    let isMatch = true
    for (let i = 0; i < arr.length; i++) {
      
      if (this.isAMatch(ranges, i)) {
        if( ! isMatch){
          ret[ret.length] = "</div>"
          isMatch = true
        }
      } else {
        if( isMatch){
          isMatch = false
          ret[ret.length] = "<div>"
        }
      }
      ret[ret.length] = arr[i]
    }
    if( ! isMatch){
      ret[ret.length] = "</div>"
    }

    let retsr = ret.join("")

    return retsr
  }

  orderRanges(ix: number): Range[] {
    let ret: Range[] = [];
    this.matchingRanges.forEach((r) => {
      if (ix == 0) {
        ret[ret.length] = r.r1
      } else {
        ret[ret.length] = r.r2
      }
    })

    return ret;
  }
  formatString1(): string {
    return this.formatString(this.arr1, this.orderRanges(0))
  }
  formatString2(): string {
    return this.formatString(this.arr2, this.orderRanges(1))
  }


  /*
  search the two texts within the respective ranges to find the bigges match 
  */
  findMatch(targetRange: FullRange): FullRange {
    if (!targetRange.isEmpty) {

      let cur_size = targetRange.maxlen

      
      while (cur_size >= MIN_SIZE_MATCH) {
        for (let s1 = 0; (s1 + cur_size) <= targetRange.r1.len; s1++) {
          let c1 = s1 + targetRange.r1.cursor
          let e1 = c1 + cur_size
          let st1 = this.arr1.slice(c1, e1).join("")

          for (let s2 = 0; (s2 + cur_size) <= targetRange.r2.len; s2++) {
            let c2 = s2 + targetRange.r2.cursor
            let e2 = c2 + cur_size
            let st2 = this.arr2.slice(c2, e2).join("")
            if (st1 === st2) {
                return new FullRange(new Range(c1, cur_size), new Range(c2, cur_size))
            }
          }

        }
        cur_size--;
      }


    }
    return RANGE_ZERO
  }
  getAfterRange(full: FullRange, found: FullRange): FullRange {
    let ret = RANGE_ZERO
    let endPos_1_OfFull = full.r1.cursor + full.r1.len
    let endPos_1_OfFound = found.r1.cursor + found.r1.len
    if (endPos_1_OfFound < endPos_1_OfFull) {
      let endPos_2_OfFull = full.r2.cursor + full.r2.len
      let endPos_2_OfFound = found.r2.cursor + found.r2.len
      if (endPos_2_OfFound < endPos_2_OfFull) {
        ret = new FullRange(
          new Range(endPos_1_OfFound, endPos_1_OfFull - endPos_1_OfFound),
          new Range(endPos_2_OfFound, endPos_2_OfFull - endPos_2_OfFound)
        )
      }
    }


    //  this.logger.pop()
    return ret
  }
  getBeforeRange(full: FullRange, found: FullRange): FullRange {
    let ret = RANGE_ZERO
    let startPos_1_OfFull = full.r1.cursor
    let startPos_1_OfFound = found.r1.cursor
    if (startPos_1_OfFound > startPos_1_OfFull) {
      let startPos_2_OfFull = full.r2.cursor
      let startPos_2_OfFound = found.r2.cursor
      if (startPos_2_OfFound > startPos_2_OfFull) {
        ret = new FullRange(
          new Range(startPos_1_OfFull, startPos_1_OfFound - startPos_1_OfFull),
          new Range(startPos_2_OfFull, startPos_2_OfFound - startPos_2_OfFull)
        )
      }
    }
    return ret
  }

  recoverMatchingRanges(ranges: FullRange[], targetRange: FullRange) {
     let range = this.findMatch(targetRange)

    if (!range.isEmpty) {
      ranges[ranges.length] = range
      let beforeRange = this.getBeforeRange(targetRange, range)
      if (!beforeRange.isEmpty) {
        this.recoverMatchingRanges(ranges, beforeRange)
      }
      let afterRange = this.getAfterRange(targetRange, range)
      if (!afterRange.isEmpty) {
        this.recoverMatchingRanges(ranges, afterRange)
      }
    }
  }

  private recoverAllMatchingSubstrings(): FullRange[] {
   
    let ret: FullRange[] = []

    let firstFullRange = new FullRange(
      new Range(0, this.arr1.length), new Range(0, this.arr2.length)
    )

    this.recoverMatchingRanges(ret, firstFullRange)
    return ret
  }
}

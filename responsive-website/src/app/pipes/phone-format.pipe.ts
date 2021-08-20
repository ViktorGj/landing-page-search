import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  pure: false
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phone: number): string {
    const phoneStr = phone.toString();
    const chunks = [];
    let modifiedStr = '';
    for (let i = 0, startIndex = 0; i < 3; ++i, startIndex += 3) {
      const chunk = i === 2
        ? phoneStr.substring(startIndex, phoneStr.length)
        : phoneStr.substring(startIndex, startIndex + 3);
      chunks.push(chunk);
    }

    for (const [index, chunk] of chunks.entries()) {
      let newChunk = '';
      if (index === 0) {
        newChunk = '(' + chunk + ') ';
      }
      if (index === 1) {
        newChunk = chunk + '-';
      }
      if (index === 2) {
        newChunk = chunk;
      }
      modifiedStr = modifiedStr.concat(newChunk);
    }

    return modifiedStr;
  }

}

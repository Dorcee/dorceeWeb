import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(values: any[], args?: any) {
    return values.find(item => {
    	console.log(args);
    	console.log('args');
    	return item == args.value;
    });
  }

}
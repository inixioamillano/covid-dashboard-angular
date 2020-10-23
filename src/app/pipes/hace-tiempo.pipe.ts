import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'haceTiempo'
})
export class HaceTiempoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
          return 'ahora mismo';
          const intervals = {
            'año': 31536000,
            'mes': 2592000,
            'semana': 604800,
            'día': 86400,
            'hora': 3600,
            'minuto': 60,
            'segundo': 1
          };
          let counter;
          for (const i in intervals) {
            counter = Math.floor(seconds / intervals[i]);
            if (counter > 0)
              if (counter === 1) {
                return 'hace ' + counter + ' ' + i;
              } else {
                if (i === 'mes'){
                  return 'hace ' + counter + ' ' + i + 'es';  
                }
                return 'hace ' + counter + ' ' + i + 's';
              }
          }
    }
    return value;
  }

}

import { SafeUrl } from '@angular/platform-browser';
import { Url } from 'node:url';

export interface ImgHandler {
  file: File;
  url: string | ArrayBuffer | null;
}

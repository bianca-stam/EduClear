import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {initQuillIcons} from '@/app/utils/quill-icons-init';

initQuillIcons()

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

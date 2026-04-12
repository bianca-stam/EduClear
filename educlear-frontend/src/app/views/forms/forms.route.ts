import { Routes } from '@angular/router';
import { BasicElements } from './basic-elements/basic-elements';
import { Pickers } from './pickers/pickers';
import { Selects } from './selects/selects';
import { Validation } from './validation/validation';
import { Wizards } from './wizards/wizards';
import { TextEditors } from './text-editors/text-editors';
import { RangeSlider } from './range-slider/range-slider';
import { Layouts } from './layouts/layouts';
import { FileUploads } from './file-uploads/file-uploads';
import { OtherPlugins } from './other-plugins/other-plugins';


export const FORMS_ROUTES: Routes = [
    {
        path: 'forms/basic-elements',
        component: BasicElements,
        data: { title: "Basic Elements" },
    },
    {
        path: 'forms/pickers',
        component: Pickers,
        data: { title: "Form Pickers" },
    },
    {
        path: 'forms/select',
        component: Selects,
        data: { title: "Form Select" },
    },
    {
        path: 'forms/validation',
        component: Validation,
        data: { title: "Form Validation" },
    },
    {
        path: 'forms/wizard',
        component: Wizards,
        data: { title: "Form Wizard" },
    },
    {
        path: 'forms/text-editors',
        component: TextEditors,
        data: { title: "Text Editors" },
    },
    {
        path: 'forms/range-slider',
        component: RangeSlider,
        data: { title: "Range Slider" },
    },
    {
        path: 'forms/layouts',
        component: Layouts,
        data: { title: "Forms Layout" },
    },
    {
        path: 'forms/file-uploads',
        component: FileUploads,
        data: { title: "File Uploads" },
    },
    {
        path: 'forms/other-plugins',
        component: OtherPlugins,
        data: { title: "Other Plugins" },
    },
];

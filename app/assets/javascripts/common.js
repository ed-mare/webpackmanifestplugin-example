// a bundle with shared javascript, css, etc.

// import javascript libraries

import { isObject } from './lib/obj.js'
import Rails from 'rails-ujs/lib/assets/compiled/rails-ujs.js';
Rails.start();
console.log("This is in common.js");

// import stylesheets

import '../stylesheets/common.scss';

// import images used directly in rails templates

import '../images/tripadvisor.png'

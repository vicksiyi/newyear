import axios from 'axios';
import config from '../config';

const baseUrl = process.env.NODE_ENV === 'delopment' ? config.baseUrl.dev : config.baseUrl.pro;


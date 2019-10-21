import SwaggerUI from 'swagger-ui';
import css from 'swagger-css';

document.addEventListener('DOMContentLoaded', () => {
  SwaggerUI({
    dom_id: '#swaggerContainer',
    url: 'openapi.yaml'
  })
});

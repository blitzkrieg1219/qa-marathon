const config = {
    api: {
      host: '/api_hiroshi_takemori',
      port: '3000',
      path: {
        customers: {
          list: '/customers',
          detail: '/customers',
          add: '/customers/add',
          update: '/customers/update',
          delete: '/customers/delete'
        }
      },
    },
    html: {
      customer: {
        addConfirm: '/customer/add-confirm.html',
        detail: '/customer/detail.html',
        list: '/customer/list.html'
      }
    }
  };
  
  export default config;
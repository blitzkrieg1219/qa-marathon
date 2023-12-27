const config = {
    api: {
      host: '/api_hiroshi_takemori',
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
        addConfirm: '/api_hiroshi_takemori/customer/add-confirm.html',
        detail: '/api_hiroshi_takemori/customer/detail.html',
        list: '/api_hiroshi_takemori/customer/list.html'
      }
    }
  };
  
  export default config;
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
        addConfirm: '/hiroshi_takemori/customer/add-confirm.html',
        detail: '/hiroshi_takemori/customer/detail.html',
        list: '/hiroshi_takemori/customer/list.html'
      }
    }
  };
  
  export default config;
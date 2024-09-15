const sensors = [
  {
    label: 'Poddasze',
    hummidity: {
      channel: 'dominikdeka@gmail.com/hummidity/bedroom'
    },
    temperature: {
      channel: 'dominikdeka@gmail.com/temperature/bedroom'
    }
  },
  {
    label: 'I Piętro',
    hummidity: {
      channel: 'dominikdeka@gmail.com/hummidity/justyna'
    },
    temperature: {
      channel: 'dominikdeka@gmail.com/temperature/justyna'
    }
  },
  {
    label: 'Parter',
    hummidity: {
      channel: 'dominikdeka@gmail.com/hummidity/salon'
    },
    temperature: {
      channel: 'dominikdeka@gmail.com/temperature/salon'
    }
  },
  {
    label: 'Pralnia',
    hummidity: {
      channel: 'dominikdeka@gmail.com/hummidity/loundry'
    },
    temperature: {
      channel: 'dominikdeka@gmail.com/temperature/loundry'
    }
  },
  {
    label: 'Na zewnątrz',
    hummidity: {
      channel: 'dominikdeka@gmail.com/hummidity/front'
    },
    temperature: {
      channel: 'dominikdeka@gmail.com/temperature/front'
    }
  },
  {
    label: 'Pod tarasem',
    hummidity: {
      channel: 'dominikdeka@gmail.com/hummidity/taras'
    },
    temperature: {
      channel: 'dominikdeka@gmail.com/temperature/taras'
    }
  },
  
];

module.exports ={
  sensors
}
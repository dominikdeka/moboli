const CHANNEL1 = 173692;
const CHANNEL2 = 2128319;

const channels = [CHANNEL1, CHANNEL2];

const sensors = [
  {
    label: 'Poddasze',
    hummidity: {
      mqttChannel: 'dominikdeka@gmail.com/hummidity/bedroom',
      thingspeakReadings: {
        channel: CHANNEL2,
        field: 'field6'
      }
    },
    temperature: {
      mqttChannel: 'dominikdeka@gmail.com/temperature/bedroom',
      thingspeakReadings: {
        channel: CHANNEL2,
        field: 'field5'
      }
    }
  },
  {
    label: 'I Piętro',
    hummidity: {
      mqttChannel: 'dominikdeka@gmail.com/hummidity/justyna',
      thingspeakReadings: {
        channel: CHANNEL2,
        field: 'field4'
      }
    },
    temperature: {
      mqttChannel: 'dominikdeka@gmail.com/temperature/justyna',
      thingspeakReadings: {
        channel: CHANNEL2,
        field: 'field3'
      }
    }
  },
  {
    label: 'Parter',
    hummidity: {
      mqttChannel: 'dominikdeka@gmail.com/hummidity/salon',
      thingspeakReadings: {
        channel: CHANNEL2,
        field: 'field2'
      }
    },
    temperature: {
      mqttChannel: 'dominikdeka@gmail.com/temperature/salon',
      thingspeakReadings: {
        channel: CHANNEL2,
        field: 'field1'
      }
    }
  },
  {
    label: 'Pralnia',
    hummidity: {
      mqttChannel: 'dominikdeka@gmail.com/hummidity/loundry',
      thingspeakReadings: {
        channel: CHANNEL1,
        field: 'field6'
      }
    },
    temperature: {
      mqttChannel: 'dominikdeka@gmail.com/temperature/loundry',
      thingspeakReadings: {
        channel: CHANNEL1,
        field: 'field5'
      }
    }
  },
  {
    label: 'Na zewnątrz',
    hummidity: {
      mqttChannel: 'dominikdeka@gmail.com/hummidity/front',
      thingspeakReadings: {
        channel: CHANNEL1,
        field: 'field4'
      }
    },
    temperature: {
      mqttChannel: 'dominikdeka@gmail.com/temperature/front',
      thingspeakReadings: {
        channel: CHANNEL1,
        field: 'field3'
      }
    }
  },
  {
    label: 'Pod tarasem',
    hummidity: {
      mqttChannel: 'dominikdeka@gmail.com/hummidity/taras',
      thingspeakReadings: {
        channel: CHANNEL1,
        field: 'field8'
      }
    },
    temperature: {
      mqttChannel: 'dominikdeka@gmail.com/temperature/taras',
      thingspeakReadings: {
        channel: CHANNEL1,
        field: 'field7'
      }
    }
  },
  
];

module.exports ={
  sensors, channels
}
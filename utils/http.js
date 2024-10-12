import axios from "axios";
export async function fetchThinkSpeakReadings() {
  const results = {}
  try{
    for(const i of [173692, 2128319]){
      results[i] = {}
      const response = await axios.get(`https://api.thingspeak.com/channels/${i}/feeds.json?results=24`)
      response.data.feeds.forEach(element => {
        Object.keys(element).forEach(key => {
          if(!['created_at', 'entry_id'].includes(key)){
            if(!results[i][key]) {
              results[i][key] = {}
            }
            results[i][key][element.created_at] = element[key]
          }        
        });
      });
    }
  } catch(e){
    console.error(e)
  }
  return results
}
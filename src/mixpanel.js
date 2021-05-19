var mixpanel = require('mixpanel-browser');

mixpanel.init("8c6b594994dda9e22367550ea64fdf68", {debug: true, api_host: "https://api.mixpanel.com"});

const actions = {
    identify: id => {
        mixpanel.identify(id);
    },
    track: (name, props) => {
        mixpanel.track(name, props);
    },
    setPerson: (props) => {
        mixpanel.people.set(props);
    }
};

export default actions;
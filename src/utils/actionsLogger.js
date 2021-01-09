export default function (state){
    const info = {
        ...state[state.called].action,
    };

    console.log(info);
}
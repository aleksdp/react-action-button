import React from 'react'

export default class ActionButton extends React.Component {

    static propTypes = {
        className: React.PropTypes.string,
        action: React.PropTypes.func.isRequired,
        onSuccess: React.PropTypes.func,
        onError: React.PropTypes.func
    }

    constructor(){
        super();
        this.state = {
            loading: false
        }
    }

    mount = true

    componentWillUnmount = () => {
        this.mount = false
    }

    render() {
        const {className, action, onSuccess, onError, ...props} = this.props
        return (
            <div>
                {!this.state.loading ? <button type='button' className={className} onClick={async (e)=>{
                    try{
                        this.setState({
                            loading: true
                        })
                        const response = await action(e)
                        if(typeof (onSuccess) == 'function'){
                            onSuccess(response)
                        }
                        if(this.mount){
                            this.setState({
                                loading: false
                            })
                        }
                    }
                    catch (e){
                        if(this.mount){
                            this.setState({
                                loading: false,
                                e
                            })
                        }
                        if(typeof (onError) == 'function'){
                            onError(e)
                        }
                    }
                }} {...props}>
                    {this.props.children}
                </button>:
                    <div className='loader-wrap'>
                        <div className='loader'>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
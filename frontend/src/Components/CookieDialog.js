import React from "react";
import classNames from "classnames";
import styles from './CookieDialog.module.css'
import cookie, { load } from 'react-cookies'

class CookieDialog extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
            changed : true
        }
    }

    cookieAccepted = (event) =>
    {
        cookie.save("cookieAccepted","true")
        cookie.save("isDark","false")
        cookie.save("language","en")
        document.getElementById("myModal").style.display = "none"
        if(this.state.changed)
            this.setState({changed : false})
    }

    render(){
            if(cookie.load('isDark') == undefined)
            {
            return(
                <div id="myModal" className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className="text-left text-black text-4xl ml-7 mt-10 font-Lobster">
                            We use cookies
                        </div>
                        <div className={styles.innerContent}>
                            This site uses cookies. We use
                            them to improve your user experience.
                            By using our site, you agree to using
                            cookies. Learn more
                        </div>
                        <div className={styles.innerContent}>
                            <button onClick={(event) => this.cookieAccepted(event)} className="inline-block bg-white align-baseline px-12 border shadow-lg border-black rounded-lg  font-bold font-QuickSand py-2 text-black" href="#">
                                Accept and Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
            return null
        }
}

export default CookieDialog
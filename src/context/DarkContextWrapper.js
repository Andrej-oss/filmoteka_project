import React, {Component} from 'react';
import { isDarkThemeContext, DarkThemeContext} from "./index";

export class DarkContextWrapper extends Component {
    state = {
        isDarkTheme: isDarkThemeContext
};
    onDarkThemeToggle = () =>{
        debugger
        this.setState({
            isDarkTheme: !this.state.isDarkTheme
        })
    };
    render() {
        const { children } = this.props;
        return (
            <DarkThemeContext.Provider value={{
                isDarkTheme:this.state.isDarkTheme,
                onDarkThemeToggle:this.onDarkThemeToggle
            }}>
                {children}
            </DarkThemeContext.Provider>
        );
    }
}


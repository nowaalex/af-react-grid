import { UNIQUE_HASH } from "../../constants";

class StateSaver{

    constructor(){

        const obj = localStorage.getItem( UNIQUE_HASH );
        this.StorageObject = obj ? JSON.parse( obj ) : {};

        window.addEventListener( "beforeunload", () => {
            if( Object.keys( this.StorageObject ).length > 1 ){
                localStorage.setItem(
                    UNIQUE_HASH,
                    JSON.stringify( this.StorageObject )
                );
            }
        });
    }

    addStylesInfo( keyName, stylesObj ){
        this.StorageObject[ keyName ] = stylesObj;
    }

    getStylesInfo( keyName ){
        return this.StorageObject[ keyName ] || {};
    }
}

export default new StateSaver;
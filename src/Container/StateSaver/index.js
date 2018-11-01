const LOCAL_STORAGE_KEY_NAME = "aFrCtGrD";

class StateSaver{

    constructor(){

        const obj = localStorage.getItem( LOCAL_STORAGE_KEY_NAME );
        this.StorageObject = obj ? JSON.parse( obj ) : {};

        window.addEventListener( "beforeunload", () => {
            if( Object.keys( this.StorageObject ).length > 1 ){
                localStorage.setItem(
                    LOCAL_STORAGE_KEY_NAME,
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
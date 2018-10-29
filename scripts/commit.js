const fs = require( "fs" );
const { execSync } = require( "child_process" );

const EMPTY_FILE_NAME = ".hiddenGitStatusInd";

const POST_CMDS = [
    "yarn build",
    "git add dist/ example_dist/",
    "git commit --amend -C HEAD --no-verify"
];

switch( process.argv[ 2 ] ){
    case "pre":
        execSync( "yarn test", { stdio: [ 0, 1, 2 ] } );
        fs.closeSync( fs.openSync( EMPTY_FILE_NAME, "w" ) );
        break;
    case "post":
        if( fs.existsSync( EMPTY_FILE_NAME ) ){
            fs.unlinkSync( EMPTY_FILE_NAME );

            POST_CMDS.forEach( cmd => {
                
                try{
                    execSync( cmd, { stdio: [ 0, 1, 2 ] } );
                }
                catch( e ){
                    console.error( e )
                }
            })
        }
        break;
}
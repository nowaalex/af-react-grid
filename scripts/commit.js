const fs = require( "fs" );
const { execSync } = require( "child_process" );

const EMPTY_FILE_NAME = ".hiddenGitStatusInd";

const POST_CMDS = [
    "npm run build",
    "git add dist/ example_dist/",
    "git commit --amend -C HEAD --no-verify"
];

const STDIO_ARR = [ 0, 1, 2 ];

switch( process.argv[ 2 ] ){

    case "pre":
        execSync( "yarn test", { stdio: STDIO_ARR } );
        fs.closeSync( fs.openSync( EMPTY_FILE_NAME, "w" ) );
        break;

    case "post":
        if( fs.existsSync( EMPTY_FILE_NAME ) ){

            fs.unlinkSync( EMPTY_FILE_NAME );

            POST_CMDS.forEach( cmd => {
                console.log( `Running: ${cmd}` );
                execSync( cmd, { stdio: STDIO_ARR } );
            });
        }
        break;
    
    default:
        throw new Error( "Wrong commit.js usage" );
}
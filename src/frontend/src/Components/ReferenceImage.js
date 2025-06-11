import React from "react";
import '@aws-amplify/ui-react/styles.css';

import {
    Alert,
    Image,
    useTheme,
    Button
} from '@aws-amplify/ui-react';

function ReferenceImage({ faceLivenessAnalysis , tryagain }) {
    const { tokens } = useTheme();
    console.log("d6",faceLivenessAnalysis);
    return (
        <>
            {/*<Alert*/}
            {/*    variation="info"*/}
            {/*    isDismissible={false}*/}
            {/*    hasIcon={false}*/}
            {/*    marginTop={tokens.space.large}*/}
            {/*>*/}
            {/*    Session ID: {faceLivenessAnalysis.SessionId}*/}
            {/*</Alert>*/}
            {/*<Alert*/}
            {/*    variation="info"*/}
            {/*    isDismissible={false}*/}
            {/*    hasIcon={false}*/}
            {/*>*/}
            {/*    Status: {faceLivenessAnalysis.Status}*/}
            {/*</Alert>*/}
            <Alert
                variation="info"
                isDismissible={false}
                hasIcon={false}
            >
                Liveness result - <br />
                Session ID: {faceLivenessAnalysis.SessionId}  <br />
                Status: {faceLivenessAnalysis.Status} <br />
                Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
            </Alert>

            <Alert
                variation="info"
                isDismissible={false}
                hasIcon={false}
            >
                Comparison result - <br />
                Match Result: {faceLivenessAnalysis.compareResult.match.toString()} <br />
                {faceLivenessAnalysis.compareResult.match && (
                    <>Similarity Result: {faceLivenessAnalysis.compareResult.similarity} <br /></>
                )}
                Message: {faceLivenessAnalysis.compareResult.message}
            </Alert>


            {/*{faceLivenessAnalysis.compareResult.match = (*/}
            {/*    <Alert variation="error" isDismissible={false} hasIcon={true}>*/}
            {/*        Error: Confidence must be 100%. Try again. deepak*/}
            {/*    </Alert>*/}
            {/*)}*/}

            <Button variation="primary" type="submit" marginTop={tokens.space.large} marginBottom={tokens.space.large} onClick={tryagain}>Try Again</Button>

            <Image
                src={"data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="50% 50%"
            />
        </>
    );
}

export default ReferenceImage;

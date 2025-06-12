import React from "react";
import { useEffect } from "react";
import { Loader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
function FaceLiveness({faceLivenessAnalysis}) {
    const [loading, setLoading] = React.useState(true);
    const [sessionId, setSessionId] = React.useState(null)
    const endpoint = process.env.REACT_APP_ENV_API_URL ? process.env.REACT_APP_ENV_API_URL : ''
    useEffect(() => {
        /*
         * API call to create the Face Liveness Session
         */
        const fetchCreateLiveness = async () => {
            const response = await fetch(endpoint + 'start-liveness');
            const data = await response.json();
            setSessionId(data.sessionId)
            setLoading(false);
        };
        fetchCreateLiveness();
    },[])
    /*
   * Get the Face Liveness Session Result
   */
    const handleAnalysisComplete = async () => {
        /*
         * API call to get the Face Liveness Session result
         */
        const response = await fetch(endpoint + 'get-liveness-results',
            {
                method: 'POST',
                body: JSON.stringify({ sessionId: sessionId })
            }
        );
        const data = await response.json();
        const analysis = JSON.parse(data.body);


        const confidence = analysis.Confidence;
        const sourceS3Key = analysis.ReferenceImage.S3Object.Name;

        console.log("confidence data is"+confidence);
        console.log("sourceS3Key data is"+sourceS3Key);

        if (confidence >= 90) {
            try {
                console.log("deepak1");

                const compareResponse = await fetch(endpoint + 'compare-faces', {
                    method: 'POST',
                    body: JSON.stringify({
                        source_bucket: 'krishnabucket36',
                        source_image: 'Image (1).jpeg',
                        target_bucket: 'videocomparisionbucket',
                        target_image: sourceS3Key
                    }),
                });

                console.log("deepak2");
                // const rawResult = await compareResponse.json();
                // const compareResult = {
                //     ...rawResult,
                //     body: JSON.parse(rawResult.body),
                // };

                const raw = await compareResponse.json();           // { statusCode: 200, body: "..." }
                const compareResult = JSON.parse(raw.body);

                console.log("deepak3" , compareResult);

                faceLivenessAnalysis({
                    ...analysis,
                    compareResult
                });

                console.log("deepak4" , faceLivenessAnalysis);

            } catch (error) {
                console.error('Face comparison failed:', error);
                faceLivenessAnalysis({
                    ...analysis,
                    compareResult: {
                        match: false,
                        message: 'Face comparison request failed'
                    }
                });
            }
        } else {
            faceLivenessAnalysis({
                ...analysis,
                compareResult: {
                    match: false,
                    message: 'Liveness confidence too low (< 90%)'
                }
            });
        }
        // faceLivenessAnalysis(analysis)

    };
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <FaceLivenessDetector
                    sessionId={sessionId}
                    region="us-east-1"
                    onAnalysisComplete={handleAnalysisComplete}
                    onError={(error) => {
                        console.error(error);
                    }}
                />
            )}
        </>
    );
}

export default FaceLiveness;

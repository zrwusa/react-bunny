import * as React from 'react';
import {useState} from 'react';
import {proxyFactory} from '../../helpers/proxy-factory';
import {VividAlgorithm} from '../vivid-algorithm';

export interface AlgorithmPanelProps {
    algorithm: (...args: any[]) => any;
    testCase: any[];
    buttonLabel: string;
    referenceData?: any;
    relatedNodeKey?: string | undefined;
    relatedRouteKey?: string | undefined;
    isDebug?: boolean;
}

export const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
                                                                  algorithm,
                                                                  testCase,
                                                                  buttonLabel = 'default',
                                                                  relatedNodeKey,
                                                                  referenceData,
                                                                  relatedRouteKey
                                                              }) => {
    const [values, setValues] = useState<{ [key in string]: unknown }>();
    const _clickHandler = async () => {
        const result = await algorithm(...testCase, proxyFactory(setValues));
        console.log('Result : ', result);
    };
    return (
        <div>
            <button onClick={_clickHandler}>
                <span>{buttonLabel}</span>
            </button>
            {
                values
                    ? <VividAlgorithm data={values}
                                      relatedNodeKey={relatedNodeKey}
                                      referenceData={referenceData}
                                      relatedRouteKey={relatedRouteKey}/>
                    : null
            }
        </div>
    );
};

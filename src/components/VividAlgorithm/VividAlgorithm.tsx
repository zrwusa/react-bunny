import * as React from 'react';
import {TreeNode} from '../../types';
import {
    AbstractEdge,
    AbstractGraph,
    AbstractVertex,
    BinaryTree,
    BinaryTreeNode,
    DirectedGraph,
    SinglyLinkedListNode,
    Stack,
    UndirectedGraph
} from '../../utils/data-structures';
import {Coordinate, getDirectionVector} from '../../utils/algorithms';
import {uuidV4} from '../../utils/utils';

export interface VividAlgorithmProps<T> {
    data?: T,
    referenceData?: any,
    relatedNodeKey?: string,
    relatedRouteKey?: string,
    isDebug?: boolean
}

export const VividAlgorithm = function <T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
    const {data, referenceData, relatedNodeKey, relatedRouteKey, isDebug = false} = props;

    const textFillColor = '#333333';
    const textFillActiveColor = '#ffeeff';
    const circleFillColor = '#f0f0f0';
    const circleFillActiveColor = '#3489ab';
    const rectStrokeColor = '#bbbbbb';
    const arrowColor = '#3fbb3f';
    const lineStrokeColor = '#bbbbbb';

    const matrixPanelWidth = 360;
    const matrixRectStrokeWidth = 1;
    const arrowCut = 0.3;

    const treePanelWidth = 700;
    const treePanelHeight = 400;
    const svgWithHeight = {width: 700, height: 400};

    const lineStrokeWidth = 1;
    const strokeWidth = 2;
    const levelOffset = 60;
    const circleR = 20;
    const nodeSpace = 40;
    const fontSize = 12;
    const fontOffsetY = fontSize / 3;

    let relatedNode: TreeNode<any> | undefined;
    let relatedBinaryNode: BinaryTreeNode<any> | undefined;
    let relatedMatrixCell: Coordinate | undefined;
    if (relatedNodeKey) {
        relatedNode = data?.[relatedNodeKey] as TreeNode<any> | undefined;
        relatedBinaryNode = data?.[relatedNodeKey] as BinaryTreeNode<any> | undefined;
        relatedMatrixCell = data?.[relatedNodeKey] as Coordinate | undefined;
    }

    // TODO render bug needs to be fixed
    let relatedMatrixRoutes: Coordinate[][] | undefined;
    if (relatedRouteKey) {
        relatedMatrixRoutes = data?.[relatedRouteKey] as Coordinate[][] | undefined;
    }

    const VividNumber: React.FC<{ data: number }> = ({data}) => {
        return (
            <div>
                <div><span>{data.toString()}</span></div>
            </div>
        );
    };

    const getPointsByDelta = (src: Coordinate, dest: Coordinate, cutDelta?: number) => {
        if (cutDelta === undefined) cutDelta = 0;
        const PI = Math.PI;
        let angle: number = Math.atan2((dest.y - src.y), (dest.x - src.x));
        const theta: number = angle * (180 / Math.PI);
        const newSrc = new Coordinate(src.y, src.x);
        const newDest = new Coordinate(dest.y, dest.x);
        if (angle <= 0.5 * PI) {
            newSrc.x = src.x + Math.cos(angle) * cutDelta;
            newSrc.y = src.y + Math.sin(angle) * cutDelta;
            newDest.x = dest.x - Math.cos(angle) * cutDelta;
            newDest.y = dest.y - Math.sin(angle) * cutDelta;
        } else if (angle > 0.5 * PI && angle <= PI) {
            angle = PI - angle;
            newSrc.x = src.x - Math.cos(angle) * cutDelta;
            newSrc.y = src.y + Math.sin(angle) * cutDelta;
            newDest.x = dest.x + Math.cos(angle) * cutDelta;
            newDest.y = dest.y - Math.sin(angle) * cutDelta;
        }

        src = newSrc;
        dest = newDest;
        return {src, dest};
    };

    const LineWithArrow = ({
                               from,
                               to,
                               weight,
                               delta
                           }: { from: Coordinate, to: Coordinate, weight?: number, delta?: number }) => {
        if (delta === undefined) delta = 0;
        const {src, dest} = getPointsByDelta(from, to, delta);

        return <g>
            <defs>
                <marker
                    id="Triangle"
                    viewBox="0 0 10 10"
                    refX="0"
                    refY="5"
                    markerWidth="4"
                    markerHeight="3"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor} stroke={arrowColor}/>
                </marker>
            </defs>
            <path
                d={`M ${src.x} ${src.y} L ${dest.x} ${dest.y}`}
                fill={arrowColor}
                stroke={arrowColor}
                strokeWidth="2"
                markerEnd="url(#Triangle)"
            />
            {
                weight !== undefined && weight !== null
                    ? <text
                        strokeWidth={1}
                        fontSize={'12px'}
                        fill={textFillColor}
                        fontWeight={100}
                        stroke={textFillColor}
                        x={src.x + (dest.x - src.x) / 2 + (src.x > dest.x ? 10 : -10)}
                        y={src.y + (dest.y - src.y) / 2 + (src.y > dest.y ? 3 : -3)}
                        textAnchor="middle"
                    >{weight}</text>
                    : null
            }

        </g>;
    };

    const VividString: React.FC<{ data: string }> = ({data}) => {
        return (
            <div>
                <div><span>{data}</span></div>
            </div>
        );
    };


    const VividTree: React.FC<{ data: TreeNode<any> }> = ({data}) => {
        return (<svg {...svgWithHeight}>

                <VividTreeRecursive node={data} level={1} index={0} familyLength={1} parentX={0} parentY={0}
                                    maxHeight={data.getHeight()}/>
            </svg>
        );
    };

    const VividBinaryTree: React.FC<{ node: BinaryTreeNode<any> | null, maxHeight?: number }> = ({node, maxHeight}) => {
        return (
            <svg {...svgWithHeight}>
                {node
                    ? <VividBinaryTreeRecursive node={node} level={1} index={0} familyLength={1}
                                                maxHeight={maxHeight}/>
                    : null
                }
            </svg>

        );
    };

    const VividGraph: React.FC<{ data: AbstractGraph<AbstractVertex, AbstractEdge> }> = ({data}) => {
        return (<svg {...svgWithHeight}>
                {
                    data
                        ? <VividGraphDrawer graph={data}/>
                        : null
                }
            </svg>
        );
    };


    const VividMatrix: React.FC<{ data: Array<Array<any>> }> = ({data}) => {
        const rowCount = data?.length;
        const colCount = data?.[0]?.length;
        if (colCount < 1) {
            return null;
        }
        const rectSize = (matrixPanelWidth - (colCount + 1) * matrixRectStrokeWidth) / colCount;
        const matrixHeight = rectSize * rowCount;

        return (
            <svg {...svgWithHeight}>
                <g>
                    {data.map((row, i) => {
                        return row.map((col, j) => {
                            const colKey = i + '-' + j.toString();
                            const isActive = (relatedMatrixCell?.y === i && relatedMatrixCell?.x === j);
                            return <rect
                                key={colKey}
                                x={j * rectSize}
                                y={i * rectSize}
                                width={rectSize}
                                height={rectSize}
                                stroke={rectStrokeColor}
                                strokeDasharray={`${rectSize},${rectSize * 2},${rectSize}`}
                                strokeWidth={matrixRectStrokeWidth}
                                fill={isActive ? circleFillActiveColor : circleFillColor}
                            />;
                        });
                    })}
                    {data.map((row, i) => {
                        const rowKey = i.toString();

                        return row.map((col, j) => {
                            const colKey = 'text-' + i + '-' + j.toString();
                            const isActive = (relatedMatrixCell?.y === i && relatedMatrixCell?.x === j);
                            return <text
                                key={colKey}
                                strokeWidth={1}
                                fontSize={12}
                                fill={isActive ? textFillActiveColor : textFillColor}
                                fontWeight={100}
                                x={(j + 0.5) * rectSize}
                                y={(i + 0.5) * rectSize}
                                textAnchor="middle"
                            >{data[i][j].toString()}</text>;
                        });
                    })}
                    {
                        relatedMatrixRoutes
                            ? relatedMatrixRoutes.map((route, routeIndex) => {
                                return route.map((cell, cellIndex) => {
                                    const from = cell;
                                    const to = relatedMatrixRoutes?.[routeIndex]?.[cellIndex + 1];
                                    const deviationVector = getDirectionVector(from, to);
                                    if (from && to) {
                                        const src = new Coordinate((from.y + 0.5 + deviationVector.y * arrowCut) * rectSize, (from.x + 0.5 + deviationVector.x * arrowCut) * rectSize);
                                        const dest = new Coordinate((to.y + 0.5 - deviationVector.y * arrowCut) * rectSize, (to.x + 0.5 - deviationVector.x * arrowCut) * rectSize);

                                        return <LineWithArrow key={src.y + ',' + src.x + dest.y + dest.x}
                                                              from={src}
                                                              to={dest}
                                        />;
                                    } else {
                                        return null;
                                    }

                                });
                            })
                            : null
                    }
                </g>
            </svg>

        );
    };


    const VividTreeRecursive: React.FC<{
        node: TreeNode<any>,
        level: number,
        index: number,
        familyLength: number,
        parentX?: number,
        parentY?: number,
        maxHeight?: number
    }> = ({
              node,
              level = 1,
              index = 0,
              familyLength = 1,
              parentX,
              parentY,
              maxHeight
          }) => {
        if (!node) {
            return null;
        }
        // const firstRender = useMemo(
        //     () =>console.log('!!!first Render'),
        //     []
        // );
        let space = 0;
        let offsetX = 0;
        let offsetY = 0;
        const levelNodeSpace = nodeSpace * Math.pow(2, (maxHeight || 5) - level);
        if (level === 1) {
            space = treePanelWidth / 2;
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            if (parentX !== undefined) {
                offsetX = parentX - (familyLength / 2) * levelNodeSpace + (index + 0.5) * levelNodeSpace;
                offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
            }
        }

        const isActive = node.id === relatedNode?.id;
        return (
            <g key={node.id}>
                {
                    level > 1
                        ? <line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY}
                                stroke={lineStrokeColor}
                                strokeWidth={lineStrokeWidth}/>
                        : null
                }
                {node.children
                    ? node.children.map((child, index, family) => <VividTreeRecursive key={child.id}
                                                                                      node={child}
                                                                                      level={level + 1}
                                                                                      index={index}
                                                                                      familyLength={family.length}
                                                                                      parentX={offsetX}
                                                                                      parentY={offsetY}
                                                                                      maxHeight={maxHeight}/>)
                    : null
                }
                <circle r={circleR} cx={offsetX} cy={offsetY}
                        fill={isActive ? circleFillActiveColor : circleFillColor}/>
                <text
                    strokeWidth={1}
                    fill={isActive ? textFillActiveColor : textFillColor}
                    stroke={isActive ? textFillActiveColor : textFillColor}
                    fontSize={fontSize}
                    fontWeight={100}
                    x={offsetX}
                    y={offsetY + fontOffsetY}
                    textAnchor="middle"
                >{node.name || node.id}</text>
            </g>
        );
    };

    const VividBinaryTreeRecursive: React.FC<{
        node: BinaryTreeNode<any>,
        level: number,
        index: number,
        familyLength: number,
        parentX?: number,
        parentY?: number,
        maxHeight?: number
    }> = ({
              node,
              level = 1,
              index = 0,
              familyLength = 1,
              parentX,
              parentY,
              maxHeight
          }) => {
        if (!node) {
            return null;
        }
        let space = 0;
        let offsetX;
        let offsetY;
        const levelNodeSpace = nodeSpace * Math.pow(2, (maxHeight || 5) - level);
        if (level === 1) {
            space = treePanelWidth / 2;
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            if (parentX !== undefined) {
                offsetX = parentX - ((index < 1) ? levelNodeSpace : -levelNodeSpace);
                offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
            }
        }

        const isActive = node.id === relatedBinaryNode?.id;
        return (
            <g key={node.id}>
                {
                    level > 1
                        ? <line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY} stroke={lineStrokeColor}
                                strokeWidth={lineStrokeWidth}/>
                        : null
                }
                {
                    node.left
                        ?
                        <VividBinaryTreeRecursive node={node.left} level={level + 1} index={0}
                                                  familyLength={2} parentX={offsetX} parentY={offsetY}
                                                  maxHeight={maxHeight}/>
                        : null
                }
                {
                    node.right
                        ?
                        <VividBinaryTreeRecursive node={node.right} level={level + 1} index={1}
                                                  familyLength={2} parentX={offsetX} parentY={offsetY}
                                                  maxHeight={maxHeight}/>
                        : null
                }
                <circle r={circleR} cx={offsetX} cy={offsetY}
                        fill={isActive ? circleFillActiveColor : circleFillColor}
                        onClick={(e) => {
                            const {id, val, count, allLesserSum} = node;
                            console.info({id, val, count, allLesserSum});
                        }}
                />
                {
                    offsetY !== undefined
                        ? <text
                            fill="none"
                            stroke={isActive ? textFillActiveColor : textFillColor}
                            fontSize={fontSize}
                            fontWeight={1}
                            x={offsetX}
                            y={offsetY + fontOffsetY}
                            textAnchor="middle"
                            onClick={(e) => {
                                const {id, val, count, allLesserSum} = node;
                                console.info({id, val, count, allLesserSum});
                            }}
                        >
                            <tspan x={offsetX} y={offsetY + fontOffsetY}>{node.id}</tspan>
                            <tspan x={offsetX} y={offsetY + fontOffsetY + fontSize + 2}>{node.val !== null ? node.val : 'null'}</tspan>
                            {/*<tspan x={offsetX} y={offsetY + fontOffsetY + 2 * fontSize + 4}>{'q: ' + node.count}</tspan>*/}
                            {/*<tspan x={offsetX}*/}
                            {/*       y={offsetY + fontOffsetY + 3 * fontSize + 6}>{'s:' + node.allLesserSum}</tspan>*/}

                        </text>
                        : null
                }
            </g>
        );
    };


    const VividGraphDrawer: React.FC<{ graph: AbstractGraph<any, any> }> = ({graph}) => {
        const vertexDistance = 80;
        const vertices = graph.vertexSet();
        const vertexCount = vertices.size;
        const edges = graph.edgeSet();
        const coordsMap: Map<AbstractVertex, Coordinate> = new Map<AbstractVertex, Coordinate>();
        const rowCount = Math.ceil(Math.sqrt(vertexCount));
        let i = 0;
        vertices.forEach((vertex: any, id: any) => {
            const rowIndex = Math.floor(i / rowCount);
            const colIndex = Math.floor(i % rowCount);
            const y = (rowIndex) * vertexDistance + circleR;
            const x = (rowIndex % 2 === 0 ? (colIndex + 1) : colIndex) * vertexDistance + circleR;
            coordsMap.set(vertex, new Coordinate(y, x));
            i++;
        });
        return (
            <g>
                {
                    [...vertices].map(([id, vertex]) => {
                        const coordinate = coordsMap.get(vertex);
                        return (
                            coordinate
                                ? <g key={vertex.id}>
                                    <circle key={vertex.id} r={circleR}
                                            cx={coordinate.x}
                                            cy={coordinate.y}
                                            fill={circleFillActiveColor}/>
                                    <text key={vertex.id + 'id'}
                                          fill="none"
                                          stroke={textFillColor}
                                          fontSize={fontSize}
                                          fontWeight={1}
                                          x={coordinate.x}
                                          y={coordinate.y + fontOffsetY}
                                          textAnchor="middle"
                                    >
                                        <tspan x={coordinate.x} y={coordinate.y + fontOffsetY}>{vertex.id}</tspan>
                                    </text>
                                </g>
                                : null
                        );
                    })}
                {
                    edges.map((edge: { hashCode: string | number | null | undefined; }) => {
                        if (graph instanceof UndirectedGraph) {
                            const ends = graph.getEndsOfEdge(edge);
                            if (ends && ends.length > 1) {
                                const v1Coordinate = coordsMap.get(ends[0]);
                                const v2Coordinate = coordsMap.get(ends[1]);
                                if (v1Coordinate && v2Coordinate) {
                                    const {src, dest} = getPointsByDelta(v1Coordinate, v2Coordinate, circleR);
                                    return <g key={edge.hashCode}>
                                        <line
                                            x1={src.x} y1={src.y} x2={dest.x}
                                            y2={dest.y} stroke={lineStrokeColor}
                                            strokeWidth={lineStrokeWidth}/>
                                    </g>;
                                }
                            }
                        } else if (graph instanceof DirectedGraph) {
                            const src = graph.getEdgeSrc(edge);
                            const dest = graph.getEdgeDest(edge);
                            if (src && dest) {
                                const srcCod = coordsMap.get(src);
                                const destCod = coordsMap.get(dest);
                                const edge = graph.getEdge(src, dest);
                                if (srcCod && destCod) {
                                    return <LineWithArrow
                                        key={edge.hashCode}
                                        from={srcCod} to={destCod}
                                        weight={edge?.weight}
                                        delta={circleR}
                                    />;
                                }
                            }
                        }
                    })
                }
            </g>
        );
    };

    const VividArray: React.FC<{ data: any[] }> = ({data}) => {
        return (
            <div>
                {
                    data[0] instanceof Array
                        ? <VividMatrix data={data}/>
                        : data.map(item => {
                            switch (typeof item) {
                                case 'number':
                                    return <div
                                        key={uuidV4()}><span>{item}</span></div>;
                                case 'string':
                                    return <div
                                        key={uuidV4()}><span>{item}</span></div>;
                                default:
                                    return <div
                                        key={uuidV4()}><span>{JSON.stringify(item)}</span></div>;
                            }
                        })

                }
            </div>
        );
    };

    const VividObject: React.FC<{ data: { [key in string]: any } }> = ({data}) => {
        return (
            <div>
                {
                    Object.keys(data).map(key => {
                        return <div key={key}>
                            <span>{key}</span>
                            <span>{data[key]}</span>
                        </div>;
                    })
                }
            </div>
        );
    };

    const VividLinkedListNode: React.FC<{ data: SinglyLinkedListNode }> = ({data}) => {
        return (
            <div>
                <div key={data.index}>
                    <span>{data.index}</span>
                    <span>{data.value}</span>
                </div>
            </div>
        );
    };

    // TODO
    const VividBinaryTreeNode: React.FC<{ data: BinaryTreeNode<any> }> = ({data}) => {
        return (
            <div>
                <div key={data.id}>
                    <span>{data.id}</span>
                </div>
            </div>
        );
    };

    const VividBinarySearchTreeNode: React.FC<{ data: BinaryTreeNode<any> }> = ({data}) => {
        return (
            <div>
                <div key={data.id}>
                    <span>{data.id}</span>
                </div>
            </div>
        );
    };

    const renderVariable = (item: any) => {
        if (!item) return null;
        switch (typeof item) {
            case 'number':
                return <VividNumber data={item}/>;
            case 'string':
                return <VividString data={item}/>;
            case 'object':
                if (item instanceof TreeNode) {
                    return <VividTree data={item}/>;
                } else if (item instanceof AbstractGraph) {
                    return <VividGraph data={item}/>;
                } else if (item instanceof BinaryTreeNode) {
                    return <VividBinaryTreeNode data={item}/>;
                } else if (item instanceof BinaryTree) {
                    return <VividBinaryTree node={item.root} maxHeight={item.getHeight()}/>;
                } else if (item instanceof SinglyLinkedListNode) {
                    return <VividLinkedListNode data={item}/>;
                } else if (item instanceof Map) {
                    return <VividArray data={Array.from(item)}/>;
                } else if (item instanceof Stack) {
                    return <VividArray data={item.toArray()}/>;
                } else if (item instanceof Array) {
                    return <VividArray data={item}/>;
                } else {
                    return <VividObject data={item}/>;
                }
        }
    };

    return <div>
        {
            referenceData
                ? renderVariable(referenceData)
                : null
        }
        {
            data
                ? Object.keys(data).map(datumKey => {
                    const item = data[datumKey];
                    return (datumKey !== relatedRouteKey && datumKey !== relatedNodeKey)
                        ?
                        <div title={datumKey} key={datumKey}>
                            {
                                renderVariable(item)
                            }
                        </div>
                        : null;

                })
                : null
        }
    </div>;
};

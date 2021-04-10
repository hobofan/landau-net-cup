import React from "react";

const Bottom = () => {
  const bottomThickness = 1.6;

  const cylinderSegments = 64;
  const outerRingOuterDiameter = 50;
  const outerRingInnerDiameter = 42;
  const innerRingOuterDiameter = 28;
  const innerRingInnerDiameter = 24;
  const centerRingDiameter = 9;

  // Average of outer ring diameters
  const bridgeLength = (outerRingOuterDiameter + outerRingInnerDiameter) / 2;
  const bridgeWidth = 2.5;

  return (
    <union>
      <subtract>
        <cylinder
          height={bottomThickness}
          radius={outerRingOuterDiameter / 2}
          segments={cylinderSegments}
        />
        <subtract>
          <cylinder
            height={bottomThickness}
            radius={outerRingInnerDiameter / 2}
            segments={cylinderSegments}
          />
          <subtract>
            <cylinder
              height={bottomThickness}
              radius={innerRingOuterDiameter / 2}
              segments={cylinderSegments}
            />
            <subtract>
              <cylinder
                height={bottomThickness}
                radius={innerRingInnerDiameter / 2}
                segments={cylinderSegments}
              />
              <cylinder
                height={bottomThickness}
                radius={centerRingDiameter / 2}
                segments={cylinderSegments}
              />
            </subtract>
          </subtract>
        </subtract>
      </subtract>
      <union>
        <cuboid size={[bridgeLength, bridgeWidth, bottomThickness]} />
        <rotateZ angle={Math.PI / 3}>
          <cuboid size={[bridgeLength, bridgeWidth, bottomThickness]} />
        </rotateZ>
        <rotateZ angle={(Math.PI / 3) * 2}>
          <cuboid size={[bridgeLength, bridgeWidth, bottomThickness]} />
        </rotateZ>
      </union>
    </union>
  );
};

const Net = () => {
  const netHeight = 68;
  const bottomDiameter = 50;
  const topDiameter = 66;
  const wallThickness = 2;

  const holeSize = 6;

  const cylinderSegments = 64;

  const RotateDuplicate = ({ times, children }) => (
    <union>
      {[...Array(times).keys()].map((i) => (
        <rotateZ key={i} angle={(Math.PI / times) * i}>
          {children}
        </rotateZ>
      ))}
    </union>
  );

  const StackWithOffset = ({ rotationOffset, zOffset, times, children }) => (
    <union>
      {[...Array(times).keys()].map((i) => (
        <translateZ key={i} offset={zOffset * i}>
          <rotateZ angle={rotationOffset * i}>{children}</rotateZ>
        </translateZ>
      ))}
    </union>
  );

  return (
    <subtract>
      <align>
        <cylinderElliptic
          height={netHeight}
          startRadius={[bottomDiameter / 2, bottomDiameter / 2]}
          endRadius={[topDiameter / 2, topDiameter / 2]}
          segments={cylinderSegments}
        />
        <cylinderElliptic
          height={netHeight}
          startRadius={[
            bottomDiameter / 2 - wallThickness,
            bottomDiameter / 2 - wallThickness,
          ]}
          endRadius={[
            topDiameter / 2 - wallThickness,
            topDiameter / 2 - wallThickness,
          ]}
          segments={cylinderSegments}
        />
      </align>
      <union>
        <StackWithOffset
          rotationOffset={Math.PI / 16}
          zOffset={holeSize * 2}
          times={10}
        >
          <RotateDuplicate times={8}>
            <scaleZ factor={2}>
              <rotateX angle={Math.PI / 4}>
                <cuboid size={[topDiameter, holeSize, holeSize]} />
              </rotateX>
            </scaleZ>
          </RotateDuplicate>
        </StackWithOffset>
      </union>
    </subtract>
  );
};

const Top = () => {
  const netHeight = 68;
  const bottomDiameter = 50;
  const topDiameter = 66;
  const wallThickness = 2;

  const topThickness = 2;
  const topOverhang = 5;

  const cylinderSegments = 64;

  return (
    <align>
      <subtract>
        <union>
          <cylinderElliptic
            height={netHeight}
            startRadius={[bottomDiameter / 2, bottomDiameter / 2]}
            endRadius={[topDiameter / 2, topDiameter / 2]}
            segments={cylinderSegments}
          />
          <translateZ offset={netHeight / 2}>
            <cylinder
              height={topThickness}
              radius={topDiameter / 2 + topOverhang}
              segments={cylinderSegments}
            />
          </translateZ>
          <translateZ offset={(netHeight - topThickness) / 2}>
            <cylinder
              height={topThickness}
              radius={topDiameter / 2 + topOverhang}
              segments={cylinderSegments}
            />
          </translateZ>
        </union>
        <subtract>
          <translateZ offset={netHeight / 2 - 4.5}>
            <torus
              innerRadius={5}
              outerRadius={topDiameter / 2 + 4}
              innerSegments={cylinderSegments}
              outerSegments={cylinderSegments}
            />
          </translateZ>
        </subtract>
        <cylinderElliptic
          height={netHeight * 2}
          startRadius={[
            bottomDiameter / 2 - wallThickness,
            bottomDiameter / 2 - wallThickness,
          ]}
          endRadius={[
            topDiameter / 2 - wallThickness,
            topDiameter / 2 - wallThickness,
          ]}
          segments={cylinderSegments}
        />
      </subtract>
    </align>
  );
};

const NetCup = () => {
  // return <Top />;
  // return <Net />;
  // return <Bottom />;

  // return (
  // <union>
  // <Net />
  // <Bottom />
  // </union>
  // );

  const netHeight = 68;
  const topDiameter = 66;

  const netTopMergeOffset = 11;

  const cylinderSegments = 64;

  return (
    <union>
      <subtract>
        <Top />
        <translateZ offset={-netTopMergeOffset}>
          <align>
            <cylinder
              height={netHeight}
              radius={topDiameter / 2}
              segments={cylinderSegments}
            />
          </align>
        </translateZ>
      </subtract>
      <subtract>
        <Net />
        <translateZ offset={netHeight - netTopMergeOffset}>
          <align>
            <cylinder
              height={netHeight}
              radius={topDiameter / 2}
              segments={cylinderSegments}
            />
          </align>
        </translateZ>
      </subtract>
      <align>
        <Bottom />
      </align>
    </union>
  );
};

export default NetCup;
export { Bottom, Net };

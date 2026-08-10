import React from 'react'

const Profile = ({ userInfo }) => {
  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
      <>
        <div as="h1">
          <div name="drivers license" />
          {' '}
          My Profile
          {' '}
        </div>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0]
              const claimValue = claimEntry[1]
              const claimId = `claim-${claimName}`
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{JSON.stringify(claimValue)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
  )
}

export default React.memo(Profile)

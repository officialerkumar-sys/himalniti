import { client } from '@/lib/sanity/client'
import { teamMembersQuery } from '@/lib/sanity/queries/settings'
import type { TeamMember } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

async function getTeam(): Promise<TeamMember[]> {
  try {
    return await client.fetch(teamMembersQuery, {}, { next: { revalidate: 3600 } })
  } catch {
    return []
  }
}

export default async function AboutPage() {
  const team = await getTeam()
  const founder = team.find((m) => m.isFounder)
  const advisors = team.filter((m) => !m.isFounder)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '12px',
            }}
          >
            Organisation
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '20px',
            }}
          >
            About Himal Niti
          </h1>
          <p
            style={{
              fontSize: '19px',
              fontFamily: 'var(--font-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              maxWidth: '600px',
              margin: 0,
            }}
          >
            Himal Niti is a Section 8 non-profit organisation registered in India. We produce
            economics-led research and policy analysis for sustainable tourism management in
            the Indian Himalaya.
          </p>
        </div>
      </div>

      {/* Founder */}
      {founder && (
        <section
          style={{
            padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                fontFamily: 'var(--font-base)',
                marginBottom: '32px',
              }}
            >
              Founder
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '32px',
                alignItems: 'start',
              }}
            >
              {founder.photoUrl ? (
                <img
                  src={founder.photoUrl}
                  alt={founder.name}
                  style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--color-border)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-alt)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-base)',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {founder.name.charAt(0)}
                </div>
              )}
              <div>
                <h2
                  style={{
                    fontSize: '20px',
                    fontFamily: 'var(--font-base)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    marginBottom: '4px',
                  }}
                >
                  {founder.name}
                </h2>
                <p
                  style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-base)',
                    color: 'var(--color-accent)',
                    fontWeight: 500,
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {founder.role}
                </p>
                {founder.bio && (
                  <p
                    style={{
                      fontSize: '15px',
                      fontFamily: 'var(--font-base)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {founder.bio}
                  </p>
                )}
                {founder.linkedinUrl && (
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginTop: '16px',
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Advisors */}
      {advisors.length > 0 && (
        <section
          style={{
            padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                fontFamily: 'var(--font-base)',
                marginBottom: '32px',
              }}
            >
              Advisory Board
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {advisors.map((member) => (
                <div
                  key={member._id}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '24px',
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid var(--color-border)',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-bg-alt)',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          color: 'var(--color-text-muted)',
                          fontFamily: 'var(--font-base)',
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3
                        style={{
                          fontSize: '15px',
                          fontFamily: 'var(--font-base)',
                          fontWeight: 600,
                          color: 'var(--color-text)',
                          marginBottom: '2px',
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '12px',
                          fontFamily: 'var(--font-base)',
                          color: 'var(--color-text-muted)',
                          margin: 0,
                        }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {member.bio && (
                    <p
                      style={{
                        fontSize: '13px',
                        fontFamily: 'var(--font-base)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {member.bio}
                    </p>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginTop: '14px',
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Eklahimal connection */}
      <section
        style={{
          padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-alt)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '16px',
            }}
          >
            Related Organisation
          </p>
          <h2
            style={{
              fontSize: '22px',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}
          >
            Connection to Eklahimal
          </h2>
          <p
            style={{
              fontSize: '15px',
              fontFamily: 'var(--font-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              maxWidth: '600px',
            }}
          >
            Himal Niti and Eklahimal share a founder and a geographic focus. Eklahimal is a
            practitioner organisation working directly with mountain communities on livelihood
            and tourism design. Himal Niti is the research and policy counterpart — producing
            the evidence base that informs both Eklahimal&apos;s programme design and external
            policy engagement. The two organisations operate independently, with separate
            governance, funding, and publications.
          </p>
        </div>
      </section>

      {/* Registration */}
      <section
        style={{ padding: 'var(--space-section) clamp(20px, 4vw, 48px)' }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '24px',
            }}
          >
            Legal & Registration
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              { label: 'Registration type', value: 'Section 8 Company' },
              { label: 'Incorporated under', value: 'Companies Act 2013' },
              { label: 'Country', value: 'India' },
              { label: 'Revenue model', value: 'CSR funding & consulting' },
            ].map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-base)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '6px',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: '15px',
                    fontFamily: 'var(--font-base)',
                    color: 'var(--color-text)',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

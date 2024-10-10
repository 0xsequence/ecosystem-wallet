flowchart TD
    A[Start] --> B[Initialize WalletTransport]
    B --> C[Load Connected Origins]
    C --> D[Wait for Incoming Message]

    D --> E{Message Type}
    E -->|Connection| F[Handle Connection Request]
    E -->|Request| G[Handle Request]
    E -->|Other| D

    F --> H{Is Signed In?}
    H -->|No| I[Wait for Sign In]
    H -->|Yes| J{Is Origin Connected?}
    J -->|Yes| K[Auto-accept Connection]
    J -->|No| L[Prompt User for Approval]
    L --> M{User Approves?}
    M -->|Yes| N[Add Connected Origin]
    M -->|No| O[Reject Connection]
    I --> P{Sign In Occurred?}
    P -->|Yes| Q[Auto-accept Connection]
    P -->|No| I
    K --> R[Send Acceptance]
    N --> R
    Q --> R
    O --> S[Send Rejection]
    R --> D
    S --> D

    G --> T{Is Signed In?}
    T -->|No| U[Wait for Sign In]
    T -->|Yes| V{Is Origin Connected?}
    V -->|No| W[Prompt User for Approval]
    V -->|Yes| X[Get Handler for Method]
    W --> Y{User Approves?}
    Y -->|Yes| Z[Add Connected Origin]
    Y -->|No| AA[Reject Request]
    Z --> X
    X --> AB{Handler Exists?}
    AB -->|No| AC[Reject Request]
    AB -->|Yes| AD[Process Request]
    AD --> AE[Send Response]
    U --> AF{Sign In Occurred?}
    AF -->|Yes| AG[Auto-accept Connection]
    AF -->|No| U
    AG --> X
    AA --> D
    AC --> D
    AE --> D

    D --> AH{Sign In Event?}
    AH -->|Yes| D
    AH -->|No| D
